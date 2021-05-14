import * as actionTypes from "./userActions";
import * as data from "../../../_DATA";

export const getUsers = () => {
  return (dispatch) => {
    data._getUsers().then((users) => {
      dispatch(getUsersSuccess({ users }));
    });
  };
};

export const getUsersSuccess = (payload) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    payload,
  };
};
