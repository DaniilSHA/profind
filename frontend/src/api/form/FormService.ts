import {serverAPI} from "../ServerAPI";
import {store} from "../../redux/store";
import * as profile from "../../redux/profile/profileActions";
import {Profile} from "../../redux/profile/profileReducer";

const BASE_TOKEN_KEY = 'base_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export class FormService {
    constructor() {
        console.log('formService constructor');
    }

    public updateData(userData: any) {
        store.dispatch(profile.profileUpdate(userData));
    }

    public updateMeta(meta: number) {
        store.dispatch(profile.metaUpdate(meta));
    }

}

export const formService: FormService = new FormService();