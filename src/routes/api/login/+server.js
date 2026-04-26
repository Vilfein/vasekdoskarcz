import { json } from '@sveltejs/kit';

// ─── TESTOVACÍ ÚČTY (smazat po napojení na server) ──────────────────────────
//   Admin  : admin@vasekdoskar.cz  /  admin123
//   Uživatel: ahoj@seznam.cz       /  ahoj123
// ────────────────────────────────────────────────────────────────────────────
const USERS = [
    { id: 1, name: 'Admin',          email: 'admin@vasekdoskar.cz', password: 'admin123', role: 'admin' },
    { id: 2, name: 'Testovací účet', email: 'ahoj@seznam.cz',       password: 'ahoj123',  role: 'user'  },
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
