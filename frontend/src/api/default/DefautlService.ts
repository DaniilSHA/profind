import {serverAPI, URL_CORE_HOST, URL_TOKEN_MODERATION_NEW, URL_TOKEN_PROFILE} from "../ServerAPI";
import {moderationService} from "../moderation/ModerationService";
import {formService} from "../form/FormService";
import {findService} from "../find/FindService";
import {store} from "../../redux/store";

export class DefaultService {
    constructor() {
        console.log('defaultService constructor');
    }

    public init() {
        let userData, storeState;

        //Инициализация профиля
        serverAPI.requestWrapper({
            requestType: {
                type: 'GET',
            },
            url: URL_TOKEN_PROFILE,
            body: null,
        }).then(data => {
            console.log(data);
            if (data.status === 200) {
                formService.updateData(data.data);
                formService.updateMeta(data.status);
            }
            if (data.status === 204) {
                formService.updateMeta(data.status);
            }
        }).catch(error => {
            console.log(error);
        })
        //Инициализация анкет модерации
        storeState = store.getState();
        if (storeState.authLog.profileData.profile.role === 'MODER') {
            setInterval(() => {
                serverAPI.requestWrapper({
                    requestType: {
                        type: 'GET',
                    },
                    url: URL_TOKEN_MODERATION_NEW,
                    body: null,
                }).then(data => {
                    if (data.status === 200) {
                        moderationService.updateList(data.data);
                        console.log(data.data);
                    }
                }).catch(error => {
                    console.log(error);
                });
                console.log('initModeration');
            }, 1000);
        }
        //Инициализация списка поиска
        setTimeout(() => {
            storeState = store.getState();
            userData = storeState.profile.profile;
            serverAPI.requestWrapper({
                requestType: {
                    type: 'GET',
                },
                url: ((userData.goal == 'STUDENT')) ? `${URL_CORE_HOST}/profiles/prematch?goal=TEACHER&lang=${userData.program_language}&swaipUsers=false` : ((userData.goal == 'TEACHER')) ? `${URL_CORE_HOST}/profiles/prematch?goal=STUDENT&lang=${userData.program_language}&swaipUsers=false` : '',
                body: null,
            }).then(data => {
                console.log(data);
                if (data.status === 200) {
                    findService.updateList(data.data);
                }
            }).catch(error => {
                console.log(error);
            })
        }, 50);
    }
}

export const defaultService = new DefaultService();