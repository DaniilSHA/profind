const initialState: any[] = []

const ADD_ITEMS: string = "ADD_ITEMS";
export const findReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case ADD_ITEMS:
            if (Array.isArray(action.payload)) {
                return [...action.payload];
            }
            return state;

        default:
            return state;
    }
}