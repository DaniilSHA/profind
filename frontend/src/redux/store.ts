import {createStore, combineReducers} from "redux";
import {loginReducer} from "./loginReducer";
import {registerReducer} from "./registerReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    authLog: loginReducer,
    authReg: registerReducer,
})
export const store = createStore(rootReducer, composeWithDevTools());