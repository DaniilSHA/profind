import axios from "axios";


const URL_AUTH_HOST = `http://localhost:8080`
const URL_TOKEN_CHECK = `${URL_AUTH_HOST}/check`;
const URL_TOKEN_REG = `${URL_AUTH_HOST}/register`;

/*type ResponseTokenCheck = {
    isAuth: false,
    username: null,
    role: null,
} */

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

    public start() {
    }
}

export const serverAPI: ServerAPI = new ServerAPI();