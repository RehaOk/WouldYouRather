import * as actionTypes from "./questionActions";
import * as data from "../../../_DATA";

export const addQuestions = (payload) => {
  return {
    type: actionTypes.ADD_QUESTIONS,
    payload,
  };
};

export const saveQuestionAnswer = (payload) => {
  return async (dispatch) => {
    await data._saveQuestionAnswer(payload);
    dispatch(saveQuestionAnswerSuccess({ qid: payload.qid }));
  };
};

export const saveQuestionAnswerSuccess = (payload) => {
  return {
    type: actionTypes.SAVE_QUESTION_ANSWER_SUCCESS,
    payload,
  };
};

export const clearSavedQuestionAnswerSuccess = () => {
  return {
    type: actionTypes.CLEAR_SAVED_QUESTION_ANSWER_SUCCESS,
  };
};

export const getQuestions = () => {
  return async (dispatch) => {
    await data._getQuestions().then((questions) => {
      dispatch(getQuestionsSuccess({ questions }));
    });
  };
};

export const getQuestionsSuccess = (payload) => {
  return {
    type: actionTypes.GET_QUESTIONS_SUCCESS,
    payload,
  };
};

/* payload: { optionOneText, optionTwoText, author } */
export const createQuestion = (payload) => {
  return async (dispatch) => {
    await data._saveQuestion(payload).then((question) => {
      dispatch(createQuestionSuccess({ question }));
    });
  };
};

export const createQuestionSuccess = (payload) => {
  return {
    type: actionTypes.CREATE_QUESTION_SUCCESS,
    payload,
  };
};
