import {createStore, combineReducers} from "redux";
import {loginReducer} from "./auth/loginReducer";
import {registerReducer} from "./auth/registerReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {profileReducer} from "./profile/profileReducer";
import {moderationReducer} from "./moderation/moderationReducer";

const rootReducer = combineReducers({
    authLog: loginReducer,
    authReg: registerReducer,
    profile: profileReducer,
    moderation: moderationReducer,
})
export const store = createStore(rootReducer, composeWithDevTools());