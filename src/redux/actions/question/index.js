import * as actionTypes from "./questionActions";

export const addQuestions = (payload) => {
  return {
    type: actionTypes.ADD_QUESTIONS,
    payload,
  };
};
