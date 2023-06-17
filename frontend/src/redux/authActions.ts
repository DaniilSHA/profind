type Role = {
    role: "USER"|"ADMIN"|"MODER",
}
export type LoginSuccessData = {
    username: string,
    role: Role,
}

export const loginSuccess = (user: LoginSuccessData) => {
    return {
        type: 'LOGIN_SUCCESS',
        username: user.username,
        role: user.role.role,
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