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
          Object.keys(this.props.questions).map((questionKey) => {
            if (this.props.questions[questionKey].id === id) {
              return (
                <PollResultCard
                  questionId={this.props.questions[questionKey].id}
                  author={this.props.questions[questionKey].author}
                  avatarURL={this.props.questions[questionKey].avatarURL}
                  optionOne={this.props.questions[questionKey].optionOne.text}
                  optionTwo={this.props.questions[questionKey].optionTwo.text}
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
