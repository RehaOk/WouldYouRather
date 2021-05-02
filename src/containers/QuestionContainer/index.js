import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PollAnswerCard from "../../components/PollAnswerCard";
const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class QuestionContainer extends React.Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <>
        {this.props.questions &&
          this.props.questions.map((question) => {
            if (question.id === id) {
              return (
                <PollAnswerCard
                  questionId={question.id}
                  author={question.author}
                  avatarURL={question.avatarURL}
                  optionOne={question.optionOne.text}
                  optionTwo={question.optionTwo.text}
                />
              );
            } else {
              return null;
            }
          })}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questionReducer.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(QuestionContainer)));
