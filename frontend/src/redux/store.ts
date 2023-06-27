import {createStore, combineReducers} from "redux";
import {loginReducer} from "./auth/loginReducer";
import {registerReducer} from "./auth/registerReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {profileReducer} from "./profile/profileReducer";

const rootReducer = combineReducers({
    authLog: loginReducer,
    authReg: registerReducer,
    profile: profileReducer,
})
export const store = createStore(rootReducer, composeWithDevTools());