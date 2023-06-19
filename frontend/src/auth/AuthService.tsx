import {serverAPI} from "./ServerAPI";
import jwt_decode from 'jwt-decode';
import {store} from "../redux/store";
import * as auth from "../redux/authActions";
import {LoginSuccessData} from "../redux/authActions";

const BASE_TOKEN_KEY: string = 'base_token';
const REFRESH_TOKEN_KEY: string = 'refresh_token';

export class AuthService {
    constructor() {
        console.log('authService constructor');
    }

    public init(): void {
        let base_token_item = window.localStorage.getItem(BASE_TOKEN_KEY);
        let base_token: string;
        base_token_item === null ? base_token = '' : base_token = base_token_item;

        serverAPI.tokenCheck(base_token).then((result) => {
            if (result) {
                const tokenInfo: LoginSuccessData = jwt_decode(base_token);
                store.dispatch(auth.loginSuccess({
                    username: tokenInfo.username,
                    role: tokenInfo.role,
                }))
                console.log(tokenInfo)
            }
        });
    }

    public register(): void {
        const state: any = store.getState();
        const username: string = state.authReg.username;
        const password: string = state.authReg.password;
        serverAPI.regUser(username, password).then((result) => {
            if (result) {
                store.dispatch(auth.changeRegMessage('Регистрация прошла успешно.'))
            } else {
                store.dispatch(auth.changeRegMessage('Данный логин уже используется.'))
            }
        })
    }

}

export const authService: AuthService = new AuthService();