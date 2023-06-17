import {serverAPI} from "./ServerAPI";

const BASE_TOKEN_KEY:string = 'base_token';
const REFRESH_TOKEN_KEY:string = 'refresh_token';

export class AuthService {
    constructor() {
        console.log('xx');
        this.check('govno');
    }

    public init():void {

    }

    public check(base_token:string):boolean {
        debugger
        serverAPI.tokenCheck(base_token);
        return false
    }
}

export const authService:AuthService = new AuthService();