import * as actionTypes from "../../actions/action-types";

const startingState = {
  authUser: null,
  isLoggedIn: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = startingState, action) {
  switch (action.type) {
    case actionTypes.CREATE_LOGIN_STATE: {
      return {
        ...state,
        authUser: action.payload.authUser,
        isLoggedIn: action.payload.isLoggedIn,
      };
    }
    case actionTypes.READ_LOGIN_STATE: {
      return {
        ...state,
        authUser: state.authUser,
        isLoggedIn: state.isLoggedIn,
      };
    }
    default: {
      return { ...state };
    }
  }
}
