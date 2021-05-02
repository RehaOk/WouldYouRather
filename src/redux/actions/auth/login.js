import * as actionTypes from "./authActions";

export const createLoginState = (payload) => {
  return {
    type: actionTypes.CREATE_LOGIN_STATE,
    payload,
  };
};

export const readLoginState = () => {
  return {
    type: actionTypes.READ_LOGIN_STATE,
  };
};
