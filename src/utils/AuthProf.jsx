export const setUser = (data) => {
    console.log('Saving user data:', data);
    if (data && data.token) {
        localStorage.setItem('token', data.token);
    }
    localStorage.setItem('user', JSON.stringify(data));
};

export const getUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            // Also get token if exists separately
            const token = localStorage.getItem('token');
            if (token && !user.token) {
                user.token = token;
            }
            return user;
        }
        return null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

export const removeUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};