import Reg from "../components/registration/Reg";

type Role = {
    role: "USER"|"ADMIN"|"MODER",
}
export type LoginSuccessData = {
    username: string,
    role: Role,
}

export type RegData = {
    username: string,
    password: string,
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

export const registration = (regData:RegData) => {
    return {
        type: 'REG_TRY',
        username:regData.username,
        password:regData.password,
    };
};

export const changeRegMessage = (message:string) => {
    return {
        type: 'CHANGE_MESSAGE',
        message: message,
    };
};



