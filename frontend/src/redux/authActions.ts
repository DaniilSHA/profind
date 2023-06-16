export const loginSuccess = (user: any) => {
    return {
        type: 'LOGIN_SUCCESS',
        username: user.username,
        role: user.role,
    };
};

export const loginFailure = (error: string) => {
    return {
        type: 'LOGIN_FAILURE',
        error: error,
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};