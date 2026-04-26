<script>
    import Course from "$lib/components/Course.svelte";
    import CourseCalendar from "$lib/components/CourseCalendar.svelte";
    import { coursesStore } from "$lib/stores/courses.svelte.js";
    import { eventsStore } from "$lib/stores/events.svelte.js";
</script>

<section class="page-section">
    <div class="container">
        <h2 class="section-title">Kurzy</h2>
        <div class="courses-grid">
            {#each coursesStore.list as course}
                <Course
                    icon={course.icon}
                    title={course.title}
                    level={course.level}
                    duration={course.duration}
                    price={course.price}
                    description={course.description}
                    topics={course.topics}
                    ctaLabel="Více o kurzu"
                    ctaHref="/courses/{course.slug}"
                />
            {/each}
        </div>

        <div class="calendar-wrap">
            <h3 class="calendar-heading">Termíny a obsazenost</h3>
            <CourseCalendar events={eventsStore.list} />
        </div>
    </div>
</section>

<style>
    .page-section {
        padding: 6rem 1.5rem;
        background: #faf8ff;
        min-height: 100vh;
    }

    .container {
        max-width: 1100px;
        margin: 0 auto;
    }

    .section-title {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: #76179C;
        text-align: center;
        margin: 0 0 3rem;
    }

    .courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.75rem;
    }

    .calendar-wrap {
        margin-top: 3rem;
    }

    .calendar-heading {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.4rem;
        font-weight: 700;
        color: #76179C;
        margin: 0 0 1.25rem;
        text-align: center;
    }

    @media (max-width: 640px) {
        .page-section {
            padding: 4rem 1.25rem;
        }
    }
</style>
