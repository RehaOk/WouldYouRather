import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PollAnswerCard from "../../components/PollAnswerCard";
import ErrorContainer from "../ErrorContainer";
const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class QuestionContainer extends React.Component {
  render() {
    let returnedVal = false;
    const id = this.props.match.params.id;
    return (
      <>
        {this.props.questions &&
          Object.keys(this.props.questions).map((questionKey, index) => {
            if (this.props.questions[questionKey].id === id) {
              returnedVal = true;
              return (
                <PollAnswerCard
                  questionId={this.props.questions[questionKey].id}
                  author={this.props.questions[questionKey].author}
                  avatarURL={this.props.questions[questionKey].avatarURL}
                  optionOne={this.props.questions[questionKey].optionOne.text}
                  optionTwo={this.props.questions[questionKey].optionTwo.text}
                />
              );
            } else if (
              !returnedVal &&
              Object.keys(this.props.questions).length - 1 === index
            ) {
              return <ErrorContainer />;
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
