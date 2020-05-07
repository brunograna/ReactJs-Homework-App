import JwtDecode from "jwt-decode";

export const TOKEN_KEY = "homework-jwt-token";
export const isAuthenticated = () => {
    if (localStorage.getItem(TOKEN_KEY) !== null) {
        try {
            new JwtDecode(getToken());
            return true;
        } catch (e) {
            return false;
        }
    }
}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const getDecodedToken = () => {
    try {
        console.warn(`Token: ${getToken()}`);
        return new JwtDecode(getToken());
    } catch (e) {
        console.error(e);
        return null;
    }
}