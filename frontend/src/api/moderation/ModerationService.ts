import {store} from "../../redux/store";
import * as moderation from "../../redux/moderation/moderationActions";

export class ModerationService {
    constructor() {
        console.log('ModerationService constructor');
    }

    public updateList(usersList: any[]) {
        store.dispatch(moderation.addItems(usersList));
    }

}

export const moderationService: ModerationService = new ModerationService();