const setToken = (token: string) => {
    localStorage.setItem('@access_token', token);
};

const removeToken = () => {
    localStorage.removeItem('@access_token');
};

const getToken = () => {
    const token = localStorage.getItem('@access_token');
    return token || '';
};

const setRefreshToken = (token: string) => {
    localStorage.setItem('@refresh_token', token);
};

const removeRefreshToken = () => {
    localStorage.removeItem('@refresh_token');
};

const getRefreshToken = () => {
    const token = localStorage.getItem('@refresh_token');
    return token || '';
};

export { setToken, setRefreshToken, removeToken, removeRefreshToken, getToken, getRefreshToken };
