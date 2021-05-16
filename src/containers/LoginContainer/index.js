import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import * as actions from "../../redux/actions";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = (theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
    position: "absolute",
    top: 400,
    right: 40,
  },
  formControl: {
    top: 200,
    minWidth: 500,
  },
  paperContainer: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "200px auto 200px auto",
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    width: 500,
    height: 500,
    position: "relative",
  },
  selectBox: {
    position: "absolute",
    width: 300,
    left: 90,
  },
  circularProgress: {
    display: "flex",
    justiftContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
});

class LoginContainer extends React.Component {
  state = {
    open: false,
    selectBoxUsers: null,
    users: null,
    selectedUser: "",
    startCategorizingQuestions: false,
  };
  handleChange = (event) => {
    this.setState({ selectedUser: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    // redux action to set logged in user
    this.props.actions.createLoginState({
      isLoggedIn: true,
      authUser: this.state.users[this.state.selectedUser],
    });
    this.setState({ startCategorizingQuestions: true });
  };

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

  componentDidMount() {
    // for use of redirected pages
    this.props.actions.getUsers();
    this.props.actions.getQuestions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      let reqUsers = [];
      Object.keys(this.props.users).forEach((user) => {
        reqUsers.push(this.props.users[user]);
      });
      this.setState({ selectBoxUsers: reqUsers, users: this.props.users });
    }
    if (
      this.state.startCategorizingQuestions &&
      this.props.authUser &&
      JSON.stringify(prevProps.authUser) !== JSON.stringify(this.props.authUser)
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
        // Reset categorizing flag
        this.setState({ startCategorizingQuestions: false });
        // Redirect after submit and categorizing questions
        if (window.location.pathname.split("/")[1] === "redirect") {
          let rest = window.location.pathname
            .split("/")
            .filter((subPath, index) => index !== 0 && subPath !== "redirect")
            .join("/");

          this.props.history.push(`/${rest}`);
        } else {
          this.props.history.push("/home");
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paperContainer}>
        {this.state.selectBoxUsers && (
          <Paper elevation={3} className={classes.paper}>
            <Button className={classes.button} onClick={this.handleSubmit}>
              Sign In
            </Button>
            <FormControl className={classes.formControl}>
              <InputLabel
                className={classes.selectBox}
                id="demo-controlled-open-select-label"
              >
                Select User
              </InputLabel>
              <Select
                className={classes.selectBox}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={this.props.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.selectedUser}
                onChange={this.handleChange}
              >
                {this.state.selectBoxUsers.map((user) => {
                  return (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Paper>
        )}
        {!this.state.selectBoxUsers && (
          <div className={classes.circularProgress}>
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authReducer.authUser,
    isLoggedIn: state.authReducer.isLoggedIn,
    users: state.userReducer.users,
    questions: state.questionReducer.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      createLoginState: (payload) => {
        dispatch(actions.createLoginState(payload));
      },
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
)(withRouter(withStyles(useStyles)(LoginContainer)));
