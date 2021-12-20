import { flashMessageConstants, flashTypesConstants } from "../constants";

const flashMessage = (handlerType, flashType = flashTypesConstants.INFO, flashMessage = "") => {
  return (dispatch) => {

    dispatch(handlerType === "open" ? open({flashType, flashMessage}) : close())
  };

  function open(flash) {
    return { type: flashMessageConstants.OPEN, flash};
  }
  function close() {
    return { type: flashMessageConstants.CLOSE };
  }

};

export const flashActions = {
  flashMessage,
};
