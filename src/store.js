import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import authReducer from "./reducers/authReducer";

export default createStore(combineReducers({
    authReducer
}),{}, applyMiddleware(thunk))