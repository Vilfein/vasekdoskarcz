<script>
    let { events = [] } = $props();

    const today = new Date();
    let year  = $state(today.getFullYear());
    let month = $state(today.getMonth()); // 0-indexed

    const DAYS   = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
    const MONTHS = ['Leden','Únor','Březen','Duben','Květen','Červen',
                    'Červenec','Srpen','Září','Říjen','Listopad','Prosinec'];

    function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }

    function firstWeekday(y, m) {
        const d = new Date(y, m, 1).getDay();
        return (d + 6) % 7; // Mon = 0 … Sun = 6
    }

    function prevMonth() {
        if (month === 0) { month = 11; year--; } else month--;
    }

    function nextMonth() {
        if (month === 11) { month = 0; year++; } else month++;
    }

    function avStatus(e) {
        const r = e.enrolled / e.capacity;
        if (r >= 1)   return 'full';
        if (r >= 0.7) return 'almost';
        return 'free';
    }

    function spotsLabel(e) {
        const left = e.capacity - e.enrolled;
        if (left <= 0) return 'Plné';
        if (left === 1) return '1 místo';
        if (left < 5)  return `${left} místa`;
        return `${left} míst`;
    }

    let grid = $derived.by(() => {
        const total = daysInMonth(year, month);
        const start = firstWeekday(year, month);
        const cells = Array(start).fill(null);
        for (let d = 1; d <= total; d++) cells.push(d);
        while (cells.length % 7) cells.push(null);
        return cells;
    });

    let evMap = $derived.by(() => {
        const map = {};
        for (const e of events) {
            const d = new Date(e.date);
            if (d.getFullYear() === year && d.getMonth() === month) {
                if (!map[e.date]) map[e.date] = [];
                map[e.date].push(e);
            }
        }
        return map;
    });

    function dateKey(d) {
        return `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }

    function isToday(d) {
        return year === today.getFullYear() &&
               month === today.getMonth()  &&
               d     === today.getDate();
    }
</script>

<div class="calendar">
    <!-- ── header ── -->
    <div class="cal-header">
        <button class="nav" onclick={prevMonth} aria-label="Předchozí měsíc">‹</button>
        <h2 class="cal-title">{MONTHS[month]} {year}</h2>
        <button class="nav" onclick={nextMonth} aria-label="Další měsíc">›</button>
    </div>

    <!-- ── grid ── -->
    <div class="cal-grid">
        {#each DAYS as label}
            <div class="weekday">{label}</div>
        {/each}

        {#each grid as d}
            <div class="day" class:empty={d === null} class:today={d !== null && isToday(d)}>
                {#if d !== null}
                    <span class="day-num">{d}</span>
                    <div class="events">
                        {#each evMap[dateKey(d)] ?? [] as event}
                            <a href="/courses/{event.slug}" class="chip av-{avStatus(event)}">
                                <span class="chip-icon">{event.icon}</span>
                                <span class="chip-body">
                                    <span class="chip-name">{event.course}</span>
                                    <span class="chip-sub">{event.time} · {spotsLabel(event)}</span>
                                </span>
                            </a>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <!-- ── legend ── -->
    <div class="legend">
        <span class="legend-item"><span class="dot free"></span>Volné</span>
        <span class="legend-item"><span class="dot almost"></span>Skoro plné</span>
        <span class="legend-item"><span class="dot full"></span>Plné</span>
    </div>
</div>

<style>
    .calendar {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        border: 1px solid #ede9f7;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(118, 23, 156, 0.08);
    }

    /* ── header ── */
    .cal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        background: linear-gradient(135deg, #2d0042 0%, #4a0070 100%);
    }

    .cal-title {
        font-size: 1.1rem;
        font-weight: 700;
        color: #fff;
        margin: 0;
        letter-spacing: 0.03em;
    }

    .nav {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
        font-size: 1.4rem;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
    }

    .nav:hover { background: rgba(255, 255, 255, 0.28); }

    /* ── grid ── */
    .cal-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        background: #ede9f7;
    }

    .weekday {
        background: #f5f0fb;
        padding: 0.55rem 0.25rem;
        text-align: center;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        color: #9B2EC8;
    }

    /* ── day cells ── */
    .day {
        background: #fff;
        min-height: 110px;
        padding: 0.45rem 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .day.empty { background: #faf8ff; }
    .day.today { background: #fdf6ff; }

    .day-num {
        font-size: 0.82rem;
        font-weight: 600;
        color: #666;
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .today .day-num {
        background: linear-gradient(135deg, #9B2EC8, #76179C);
        color: #fff;
    }

    /* ── event chips ── */
    .events {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
    }

    .chip {
        display: flex;
        align-items: flex-start;
        gap: 0.3rem;
        border-radius: 6px;
        padding: 0.3rem 0.4rem;
        text-decoration: none;
        transition: opacity 0.15s, transform 0.15s;
    }

    .chip:hover { opacity: 0.82; transform: translateY(-1px); }

    .chip-icon { font-size: 0.85rem; line-height: 1.3; flex-shrink: 0; }

    .chip-body {
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    .chip-name {
        font-size: 0.72rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
    }

    .chip-sub {
        font-size: 0.64rem;
        opacity: 0.8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
    }

    .av-free   { background: #e8f5e9; color: #2e7d32; }
    .av-almost { background: #fff8e1; color: #e65100; }
    .av-full   { background: #fce4ec; color: #c62828; }

    /* ── legend ── */
    .legend {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        padding: 0.85rem 1.5rem;
        background: #faf8ff;
        border-top: 1px solid #ede9f7;
        flex-wrap: wrap;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.8rem;
        color: #555;
    }

    .dot {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .dot.free   { background: #2e7d32; }
    .dot.almost { background: #e65100; }
    .dot.full   { background: #c62828; }

    /* ── mobile ── */
    @media (max-width: 640px) {
        .day { min-height: 72px; padding: 0.3rem 0.25rem; }
        .chip { padding: 0.2rem 0.3rem; gap: 0.2rem; }
        .chip-sub { display: none; }
        .chip-name { font-size: 0.62rem; }
        .chip-icon { font-size: 0.75rem; }
        .cal-title { font-size: 0.95rem; }
        .legend { gap: 1rem; padding: 0.75rem 1rem; }
    }
</style>
