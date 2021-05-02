import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as data from "../../_DATA";
import PollQuestionCard from "../../components/PollQuestionCard";
import PollResultCardQuestion from "../../components/PollResultCardQuestion";

import * as actions from "../../redux/actions";

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class HomeContainer extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidMount = () => {
    this.categorizeQuestions().then((questions) => {
      this.getUsers().then((users) => {
        questions.unAnsweredQuestions.forEach((question) => {
          question.avatarURL = users[question.author].avatarURL;
        });
        questions.answeredQuestions.forEach((question) => {
          question.avatarURL = users[question.author].avatarURL;
        });
        this.setState({ ...questions });
        this.props.addQuestions({
          questions: [
            ...questions.unAnsweredQuestions,
            ...questions.answeredQuestions,
          ],
        });
      });
    });
  };

  getUsers = () => {
    return new Promise((resolve) => {
      data._getUsers().then((users) => {
        resolve(users);
      });
    });
  };

  categorizeQuestions() {
    return new Promise((resolve) => {
      let unAnsweredQuestions = [];
      let answeredQuestions = [];
      data._getQuestions().then((questions) => {
        unAnsweredQuestions = Object.keys(questions)
          .map((key) => {
            return questions[key];
          })
          .filter((question) => {
            if (
              !question.optionOne.votes.includes(this.props.authUser.id) &&
              !question.optionTwo.votes.includes(this.props.authUser.id)
            ) {
              return true;
            }
          })
          .sort(function (question1, question2) {
            return (
              new Date(question1.timestamp) - new Date(question2.timestamp)
            );
          });

        answeredQuestions = Object.keys(questions)
          .map((key) => {
            return questions[key];
          })
          .filter((question) => {
            if (
              question.optionOne.votes.includes(this.props.authUser.id) ||
              question.optionTwo.votes.includes(this.props.authUser.id)
            ) {
              return true;
            }
          })
          .sort(function (question1, question2) {
            return (
              new Date(question1.timestamp) - new Date(question2.timestamp)
            );
          });
        resolve({ unAnsweredQuestions, answeredQuestions });
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={(event, newValue) => this.handleChange(event, newValue)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Unanswered Questions" />
            <Tab label="Answered Questions" />
          </Tabs>
        </Paper>
        {this.state.value === 0 &&
          this.state.unAnsweredQuestions &&
          this.state.unAnsweredQuestions.map((question) => {
            return (
              <PollQuestionCard
                questionId={question.id}
                author={question.author}
                avatarURL={question.avatarURL}
                optionOne={question.optionOne.text}
                optionTwo={question.optionTwo.text}
              />
            );
          })}
        {this.state.value === 1 &&
          this.state.answeredQuestions &&
          this.state.answeredQuestions.map((question) => {
            return (
              <PollResultCardQuestion
                questionId={question.id}
                author={question.author}
                avatarURL={question.avatarURL}
                optionOne={question.optionOne.text}
                optionTwo={question.optionTwo.text}
              />
            );
          })}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    authUser: state.authReducer.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestions: (payload) => {
      dispatch(actions.addQuestions(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(HomeContainer));
