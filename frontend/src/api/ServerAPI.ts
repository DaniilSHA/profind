import axios from "axios";
import {Form} from "../redux/form/formReducer";


const URL_AUTH_HOST = `http://localhost:8080`
const URL_TOKEN_CHECK = `${URL_AUTH_HOST}/check`;
const URL_TOKEN_REG = `${URL_AUTH_HOST}/register`;
const URL_TOKEN_LOG = `${URL_AUTH_HOST}/login`;
const URL_TOKEN_REFRESH = `${URL_AUTH_HOST}/refresh`;
const URL_TOKEN_PROFILE = `${URL_AUTH_HOST}/profile`;

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

    public baseTokenWrapper (base_token:string):string {
        return `bearer_${base_token}`;
    }

    public profile (base_token:string):Promise<Form | boolean> {
        const currentToken = this.baseTokenWrapper(base_token);
        return new Promise((resolve, reject) => {
            axios.post(URL_TOKEN_PROFILE, {
                auth_token: currentToken,
            }).then((data) => {
                console.log(data);
                resolve(true);
            }).catch((data) => {
                console.log(data);
                resolve(false);
            });
        });
    }


    public start() {
    }
}

export const serverAPI: ServerAPI = new ServerAPI();