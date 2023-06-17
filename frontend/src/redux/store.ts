import {createStore, combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    auth: authReducer,
})
export const store = createStore(rootReducer, composeWithDevTools());