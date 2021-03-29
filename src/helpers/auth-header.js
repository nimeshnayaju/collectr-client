export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('AUTH_TOKEN'));

    if (token) {
        return { Authorization: `Bearer ${token}`};
    } else {
        return {};
    }
}