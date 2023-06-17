import {serverAPI} from "./ServerAPI";
import jwt_decode from 'jwt-decode';
import {store} from "../redux/store";
import {loginSuccess} from "../redux/authActions";
import {LoginSuccessData} from "../redux/authActions";

const BASE_TOKEN_KEY: string = 'base_token';
const REFRESH_TOKEN_KEY: string = 'refresh_token';

export class AuthService {
    constructor() {
        console.log('authService constructor');
    }

    public init(): void {
        const base_token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1hcmF0aWswNyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjg3MDAzNTA4LCJleHAiOjE2ODcwMDQ0MDh9.-yHPbuE8c2G9oAAWmxnK5oTL6WNe0u9N8bxrjzqD7ek";
        serverAPI.tokenCheck(base_token).then((result) => {
            if (result) {
                const tokenInfo: LoginSuccessData = jwt_decode(base_token);
                store.dispatch(loginSuccess({
                    username: tokenInfo.username,
                    role: tokenInfo.role,
                }))
                console.log(tokenInfo)
            }
        });

    }

    public start() {
        this.init();
    }
}

export const authService: AuthService = new AuthService();