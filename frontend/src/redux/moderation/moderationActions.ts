import {ProfileState} from "../profile/profileReducer";

export const addItems = (items:ProfileState[]) => ({
    type: 'ADD_ITEMS',
    payload: items,
});