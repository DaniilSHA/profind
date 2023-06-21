import axios from "axios";


const URL_AUTH_HOST = `http://localhost:8080`
const URL_TOKEN_CHECK = `${URL_AUTH_HOST}/check`;
const URL_TOKEN_REG = `${URL_AUTH_HOST}/register`;
const URL_TOKEN_LOG = `${URL_AUTH_HOST}/login`;
const URL_TOKEN_REFRESH = `${URL_AUTH_HOST}/refresh`;

/*type ResponseTokenCheck = {
    isAuth: false,
    username: null,
    role: null,
} */

type Tokens = {
    base_token: string,
    refresh_token: string,
}

class ServerAPI {
    constructor() {
        console.log('ServerAPI constructor');
    }

    public tokenCheck(base_token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_CHECK, {
                base_token: base_token,
            }).then((data) => {
                resolve(true);
            }).catch((data) => {
                resolve(false);
            });
        })
    }

    public regUser(username: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_REG, {
                username: username,
                password: password,
            }).then((data) => {
                resolve(true);
            }).catch((data) => {
                resolve(false);
            });
        });
    }

    public loginUser(username: string, password: string): Promise<Tokens | string> {
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_LOG, {
                username: username,
                password: password,
            }).then((data) => {
                resolve({
                    base_token: data.data.base_token,
                    refresh_token: data.data.refresh_token,
                });
            }).catch((data) => {
                resolve('403')
            });
        });
    }

    public refresh(refresh_token: string): Promise<Tokens> {
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_REFRESH, {
                refresh_token: refresh_token,
            }).then((data) => {
                resolve({
                    base_token: data.data.base_token,
                    refresh_token: data.data.refresh_token,
                });
            }).catch((data)=>{
                console.log('error: ', data);
            })
        })
    }

    public start() {
    }
}

export const serverAPI: ServerAPI = new ServerAPI();