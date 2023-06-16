const defaultState: object = {
    isAuth: false,
    username: null,
    role: null,
    error: null,
}

const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
const LOGIN_FAILURE: string = "LOGIN_FAILURE";
const LOGOUT: string = "LOGOUT";


export const authReducer = (state: object = defaultState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                username: action.username,
                role: action.role,
                error: null,
            }

        case LOGIN_FAILURE: {

            return {
                ...state,
                isAuth: false,
                username: null,
                role: null,
                error: action.error,
            }
        }

        case LOGOUT: {
            return defaultState;
        }

        default:
            return state;
    }
}