// The helpers folder contains all the bits and pieces that don't fit
// into other folders but don't justify having a folder of their own.

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return `Bearer ${user.token}`
    } else {
        return "";
    }
}