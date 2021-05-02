import * as actionTypes from "../../actions/action-types";

const startingState = {
  questions: [],
};

export default function (state = startingState, action) {
  switch (action.type) {
    case actionTypes.ADD_QUESTIONS: {
      let newQuestions = action.payload.questions.filter((question) => {
        if (state.questions.length !== 0) {
          state.questions.forEach((stateQuestion) => {
            if (stateQuestion.id === question.id) {
              return false;
            }
            return true;
          });
        } else {
          return true;
        }
      });
      return {
        ...state,
        questions: [...state.questions, ...newQuestions],
      };
    }
    default: {
      return { ...state };
    }
  }
}
