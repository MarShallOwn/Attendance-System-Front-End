import { flashMessageConstants, flashTypesConstants } from "../constants";

const initialState = {
    show: false,
    flashType: flashTypesConstants.INFO,
    flashMessage: ""
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case flashMessageConstants.OPEN:
            return {
                show: true,
                flashType: action.flash.flashType,
                flashMessage: action.flash.flashMessage,
            };
        case flashMessageConstants.CLOSE:
            return {
                show: false,
                flashType: "info",
                flashMessage: ""
            };
        default:
            return state;
    }
}

export default authReducer