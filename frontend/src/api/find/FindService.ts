import {store} from "../../redux/store";
import * as find from "../../redux/find/findActions";

export class FindService {
    constructor() {
        console.log('findService constructor');
    }

    public updateList(usersList: any[]) {
        store.dispatch(find.addItems(usersList));
    }


}

export const findService: FindService = new FindService();