import {serverAPI} from "../ServerAPI";
import jwt_decode from 'jwt-decode';
import {store} from "../../redux/store";
import * as auth from "../../redux/auth/authActions";
import {Profile} from "../../redux/auth/authActions";

const BASE_TOKEN_KEY = 'base_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export class FormService {
    constructor() {
        console.log('formService constructor');
    }

}

export const formService: FormService = new FormService();