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
    componentMountToggle: false,
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  componentDidMount = () => {
    this.props.actions.getUsers();
    this.props.actions.getQuestions();
    this.setState({ componentMountToggle: !this.state.componentMountToggle });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.componentMountToggle !== prevState.componentMountToggle ||
      (JSON.stringify(prevProps.questions) !==
        JSON.stringify(this.props.questions) &&
        Object.keys(this.props.questions).length !== 0 &&
        this.props.users)
    ) {
      this.categorizeQuestions().then((questions) => {
        questions.unAnsweredQuestions.forEach((question) => {
          question.avatarURL = this.props.users[question.author].avatarURL;
        });
        questions.answeredQuestions.forEach((question) => {
          question.avatarURL = this.props.users[question.author].avatarURL;
        });
        if (questions.answeredQuestions && questions.unAnsweredQuestions) {
          this.setState({ ...questions });
          let formatArray = [
            ...questions.unAnsweredQuestions,
            ...questions.answeredQuestions,
          ];
          let formattedQuestions = {};
          formatArray.forEach((item) => {
            formattedQuestions[item.id] = item;
          });
          this.props.actions.addQuestions({
            questions: {
              ...formattedQuestions,
            },
          });
        }
      });
    }
  }

  categorizeQuestions() {
    return new Promise((resolve) => {
      let unAnsweredQuestions = [];
      let answeredQuestions = [];
      unAnsweredQuestions = Object.keys(this.props.questions)
        .map((key) => {
          return this.props.questions[key];
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
          return new Date(question1.timestamp) - new Date(question2.timestamp);
        });

      answeredQuestions = Object.keys(this.props.questions)
        .map((key) => {
          return this.props.questions[key];
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
          return new Date(question1.timestamp) - new Date(question2.timestamp);
        });
      resolve({ unAnsweredQuestions, answeredQuestions });
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
    users: state.userReducer.users,
    questions: state.questionReducer.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addQuestions: (payload) => {
        dispatch(actions.addQuestions(payload));
      },
      getUsers: () => {
        dispatch(actions.getUsers());
      },
      getQuestions: () => {
        dispatch(actions.getQuestions());
      },
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(HomeContainer));
