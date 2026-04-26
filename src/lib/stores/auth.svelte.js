import { browser } from '$app/environment';

let _user = $state(
    browser ? JSON.parse(localStorage.getItem('auth_user') ?? 'null') : null
);

export const auth = {
    get user() { return _user; },
    login(userData) {
        _user = userData;
        if (browser) localStorage.setItem('auth_user', JSON.stringify(userData));
    },
    logout() {
        _user = null;
        if (browser) localStorage.removeItem('auth_user');
    }
};
