export function   setLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

export function getLocalStorage(name) {
    return localStorage.getItem(name);
}
