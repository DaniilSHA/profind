import {serverAPI, URL_CORE_HOST, URL_TOKEN_MODERATION_NEW, URL_TOKEN_PROFILE} from "../ServerAPI";
import {moderationService} from "../moderation/ModerationService";
import {formService} from "../form/FormService";
import {findService} from "../find/FindService";
import {store} from "../../redux/store";

export class DefaultService {
    constructor() {
        console.log('defaultService constructor');
    }

    public profileInit() {
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
    }

    public moderationInit() {
        const storeState = store.getState();
        if (storeState.authLog.profileData.profile.role === 'MODER') {
            setTimeout(() => {
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
            }, 50);
        }
    }

    public findInit() {
        setTimeout(() => {
            let userData, storeState, filterGoal;
            storeState = store.getState();
            userData = storeState.profile.profile;
            if (userData.status == 'VALID') {
                switch (userData.goal) {
                    case 'STUDENT':
                        filterGoal = 'TEACHER';
                        break;
                    case 'TEACHER':
                        filterGoal = 'STUDENT';
                        break;
                    case 'STARTUP_PLAYER':
                        filterGoal = 'STARTUP_PLAYER';
                        break;
                    case 'STARTUP_BOSS':
                        filterGoal = 'INVESTOR';
                        break;
                    case 'INVESTOR':
                        filterGoal = 'STARTUP_BOSS';
                        break;
                    default:
                        filterGoal = userData.goal;
                }
                serverAPI.requestWrapper({
                    requestType: {
                        type: 'GET',
                    },
                    url: `${URL_CORE_HOST}/profiles/prematch?goal=${filterGoal}&lang=${userData.program_language}&swaipUsers=false`,
                    body: null,
                }).then(data => {
                    console.log(data);
                    if (data.status === 200) {
                        findService.updateList(data.data);
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        }, 50);
    }
    public init() {
        let userData, storeState, filterGoal;

        //Инициализация профиля
        this.profileInit();
        //Инициализация анкет модерации
        this.moderationInit();
        //Инициализация списка поиска
        this.findInit();
    }
}


export const defaultService = new DefaultService();