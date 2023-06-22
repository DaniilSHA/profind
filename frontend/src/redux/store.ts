import {createStore, combineReducers} from "redux";
import {loginReducer} from "./auth/loginReducer";
import {registerReducer} from "./auth/registerReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {formReducer} from "./form/formReducer";

const rootReducer = combineReducers({
    authLog: loginReducer,
    authReg: registerReducer,
    form: formReducer,
})
export const store = createStore(rootReducer, composeWithDevTools());