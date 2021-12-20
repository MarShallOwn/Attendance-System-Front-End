import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import authReducer from "./reducers/authReducer";
import flashMessageReducer from "./reducers/flashMessageReducer"

export default createStore(combineReducers({
    authReducer,
    flashMessageReducer
}),{}, applyMiddleware(thunk))