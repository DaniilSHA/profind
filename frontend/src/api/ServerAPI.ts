import axios from "axios";
import {Profile} from "../redux/form/formReducer";
import {bool} from "yup";
import {loginSuccess} from "../redux/auth/authActions";
import {authService, REFRESH_TOKEN_KEY} from "./auth/AuthService";
import {rejects} from "assert";


const URL_AUTH_HOST = `http://localhost:8080`
const URL_CORE_HOST = `http://localhost:8081`

const URL_TOKEN_CHECK = `${URL_AUTH_HOST}/check`;
const URL_TOKEN_REG = `${URL_AUTH_HOST}/register`;
const URL_TOKEN_LOG = `${URL_AUTH_HOST}/login`;
const URL_TOKEN_REFRESH = `${URL_AUTH_HOST}/refresh`;

export const URL_TOKEN_PROFILE = `${URL_CORE_HOST}/profile`;

const reqToCoreInstance = axios.create({
    headers: {
        auth_token: `bearer_${localStorage.getItem("base_token")}`
    }
})

type Tokens = {
    base_token: string,
    refresh_token: string,
}

type RequestType = {
    type: 'PUT' | 'POST' | 'GET' | 'DELETE',
}

type RequestWrapper = {
    requestType: RequestType,
    url: string,
    body: any
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
            }).catch(error => {
                resolve(`${error.response.status}`);
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
            }).catch(error => {
                reject();
            });
        });
    }

    public baseTokenWrapper(base_token: string): string {
        return `bearer_${base_token}`;
    }

    public profile(base_token: string): Promise<Profile | boolean> {
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

    public requestErrorHandler(error: number, request:RequestWrapper): Promise<any>|string {
        if (error === 403) {
            let refresh_token_item = window.localStorage.getItem(REFRESH_TOKEN_KEY);
            let refresh_token: string;
            refresh_token_item === null ? refresh_token = '' : refresh_token = refresh_token_item;
            this.refresh(refresh_token).then(data => {
                authService.saveTokens(data.base_token, data.refresh_token);
                return this.requestWrapper(request);
            }).catch(() => {
                authService.logout();
            });
        }
        return `${error}`;
    }

    public requestWrapper(request: RequestWrapper): Promise<any> {
        switch (request.requestType.type) {
            case 'POST':
                return new Promise((resolve, reject) => {
                    reqToCoreInstance.post(request.url, request.body).then((data) => {
                        resolve(data);
                    }).catch(error => {
                        const requestError = this.requestErrorHandler(error.response.status,request);
                        if (typeof (requestError) == "string") {
                            reject(requestError);
                        } else {
                            requestError.then(data => {
                                resolve(data);
                            }).catch(error => {
                                reject(error.response.status);
                            })
                        }
                    })
                })
            case 'GET':
                return new Promise((resolve, reject) => {
                    reqToCoreInstance.get(request.url).then((data) => {
                        resolve(data);
                    }).catch(error => {
                        debugger;
                        const requestError = this.requestErrorHandler(error.response.status,request);
                        if (typeof (requestError) == "string") {
                            reject(requestError);
                        } else {
                            requestError.then(data => {
                                resolve(data);
                            }).catch(error => {
                                reject(error.response.status);
                            })
                        }
                    })
                })
            case 'PUT':
                return new Promise((resolve, reject) => {
                    reqToCoreInstance.put(request.url, request.body).then((data) => {
                        resolve(data);
                    }).catch(error => {
                        const requestError = this.requestErrorHandler(error.response.status,request);
                        if (typeof (requestError) == "string") {
                            reject(requestError);
                        } else {
                            requestError.then(data => {
                                resolve(data);
                            }).catch(error => {
                                reject(error.response.status);
                            })
                        }
                    })
                })
            case 'DELETE':
                return new Promise((resolve, reject) => {
                    reqToCoreInstance.delete(request.url, request.body).then((data) => {
                        resolve(data);
                    }).catch(error => {
                        const requestError = this.requestErrorHandler(error.response.status,request);
                        if (typeof (requestError) == "string") {
                            reject(requestError);
                        } else {
                            requestError.then(data => {
                                resolve(data);
                            }).catch(error => {
                                reject(error.response.status);
                            })
                        }
                    })
                })
        }
    }


    public start() {
    }
}

export const serverAPI: ServerAPI = new ServerAPI();