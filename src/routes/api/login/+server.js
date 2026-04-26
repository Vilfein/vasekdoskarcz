import { json } from '@sveltejs/kit';

// ─── TESTOVACÍ PŘIHLÁŠENÍ (smazat po napojení na server) ───────────────────
//   E-mail : admin@vasekdoskar.cz
//   Heslo  : admin
// ───────────────────────────────────────────────────────────────────────────
const USERS = [
    { id: 1, name: 'Admin', email: 'admin@vasekdoskar.cz', password: 'admin123', role: 'admin' },
];

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { email, password } = await request.json();
    const user = USERS.find(u => u.email === email && u.password === password);

    if (!user) {
        return json({ message: 'Nesprávný e-mail nebo heslo' }, { status: 401 });
    }

    const { password: _pw, ...safe } = user;
    return json(safe);
}
