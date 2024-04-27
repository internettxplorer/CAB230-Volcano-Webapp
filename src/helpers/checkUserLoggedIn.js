export function checkUserLoggedIn() {
    if ("token" in localStorage) {
        return true;
    }
    else {
        return false;
    }
}