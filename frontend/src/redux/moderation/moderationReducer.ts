const initialState: any[] = []

const ADD_ITEMS: string = "ADD_ITEMS";
export const moderationReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case ADD_ITEMS:
            if (Array.isArray(action.payload)) {
                return [...state, ...action.payload];
            }
            return state;

        default:
            return state;
    }
}