import * as actionTypes from "../../actions/action-types";

const startingState = {
  users: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = startingState, action) {
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload.users,
      };
    }
    default: {
      return { ...state };
    }
  }
}
