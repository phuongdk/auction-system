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

export { setToken, removeToken, getToken };
