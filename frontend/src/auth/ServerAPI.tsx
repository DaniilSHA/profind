import axios from "axios";


const URL_AUTH_HOST = `http://localhost:8080`
const URL_TOKEN_CHECK = `${URL_AUTH_HOST}/check`;

class ServerAPI {
    constructor() {
        console.log('ServerAPI constructor');
    }

    public tokenCheck(base_token: string): boolean {
        axios.post(URL_TOKEN_CHECK, {
            base_token: base_token,
        }, {withCredentials: false}).then((data) => {
            console.log(data.status);
        }).catch((data) => {
            console.log(data);
        });
        return false;
    }
}

export const serverAPI: ServerAPI = new ServerAPI();