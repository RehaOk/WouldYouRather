import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PollResultCard from "../../components/PollResultCard";
const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class ResultContainer extends React.Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <>
        {this.props.questions &&
          this.props.questions.map((question) => {
            if (question.id === id) {
              return (
                <PollResultCard
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
)(withRouter(withStyles(useStyles)(ResultContainer)));
