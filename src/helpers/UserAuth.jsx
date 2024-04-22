/** 
 * @desc Check if user is logged in by verifying token exists in storage
*/
export function checkLoggedIn() {
    if (localStorage.getItem("token")) {
        return true;
    }
    else {
        return false;
    }
}