import * as actionTypes from "../../actions/action-types";

const startingState = {
  questions: {},
  savedQuestionAnswerTo: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = startingState, action) {
  switch (action.type) {
    case actionTypes.ADD_QUESTIONS: {
      let filterArray = [];
      Object.keys(action.payload.questions).forEach((question) => {
        filterArray.push(action.payload.questions[question]);
      });
      let newQuestions = filterArray.filter((question) => {
        if (Object.keys(state.questions).length !== 0) {
          Object.keys(state.questions).forEach((stateQuestionId) => {
            if (stateQuestionId === question.id) {
              return false;
            }
            return true;
          });
        } else {
          return true;
        }
      });
      let newQuestionsObj = {};
      newQuestions.forEach((newQuestion) => {
        newQuestionsObj[newQuestion.id] = newQuestion;
      });
      return {
        ...state,
        questions: { ...state.questions, ...newQuestionsObj },
      };
    }
    case actionTypes.SAVE_QUESTION_ANSWER_SUCCESS: {
      return { ...state, savedQuestionAnswerTo: action.payload.qid };
    }
    case actionTypes.CLEAR_SAVED_QUESTION_ANSWER_SUCCESS: {
      return { ...state, savedQuestionAnswerTo: "" };
    }
    case actionTypes.GET_QUESTIONS_SUCCESS: {
      return { ...state, questions: action.payload.questions };
    }
    case actionTypes.CREATE_QUESTION_SUCCESS: {
      return {
        ...state,
        questions: { [action.payload.question.id]: action.payload.question },
      };
    }
    default: {
      return { ...state };
    }
  }
}
