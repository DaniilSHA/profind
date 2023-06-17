import axios from "axios";


const URL_AUTH_HOST = `http://localhost:8080`
const URL_TOKEN_CHECK = `${URL_AUTH_HOST}/check`;

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
                console.log(data.status);
                resolve(true);
            }).catch((data) => {
                console.log(data.response.status);
                resolve(false);
            });
        })
    }

    public start() {
    }
}

export const serverAPI: ServerAPI = new ServerAPI();