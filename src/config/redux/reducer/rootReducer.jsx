import { combineReducers } from "redux";

import counterReducer from './counterReducer'
import userReducer from "./userReducer";
import privateMessageReducer from "./privateMessageReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    privateMessage: privateMessageReducer
});

export default rootReducer