import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as actions from "../../redux/actions";
import { withRouter } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const useStyles = (theme) => ({
  root: {
    width: 850,
    margin: "10px auto",
    top: 10,
    position: "relative",
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
    justifyContent: "center",
  },
  cover: {
    width: 300,
    height: 192,
  },
  nonBadge: {
    width: "90%",
    height: 70,
  },
  content: {
    flex: "1 0 auto",
  },
  scoreCard: {
    height: "100%",
  },
  score: {
    textAlign: "center",
    marginTop: 60,
  },
  scoreCardContent: {
    height: "100%",
  },
});

class LeaderboardContainer extends React.Component {
  state = {
    userScores: [],
  };

  formatUserScores = (users, questions) => {
    let usersObj = {};
    let userScores = []; // forSort
    Object.keys(users).forEach((userKey) => {
      usersObj[userKey] = {
        createdQuestionNum: 0,
        votedQuestionNum: 0,
        avatarURL: users[userKey].avatarURL,
      };
    });
    Object.keys(questions).forEach((questionKey) => {
      usersObj[questions[questionKey].author].createdQuestionNum += 1;
      // collect answer count for question
      questions[questionKey].optionOne.votes.forEach((vote) => {
        usersObj[vote].votedQuestionNum += 1;
      });
      questions[questionKey].optionTwo.votes.forEach((vote) => {
        usersObj[vote].votedQuestionNum += 1;
      });
    });

    Object.keys(usersObj).forEach((userKey) => {
      let score =
        usersObj[userKey].createdQuestionNum +
        usersObj[userKey].votedQuestionNum;
      usersObj[userKey]["score"] = score;
      usersObj[userKey]["author"] = userKey;
      userScores.push(usersObj[userKey]);
    });

    // Sort by score
    userScores.sort(function (a, b) {
      return b.score - a.score;
    });
    return userScores;
  };

  componentDidMount = () => {
    this.props.actions.getUsers();
    this.props.actions.getQuestions();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      Object.keys(this.props.users).length !== 0 &&
      Object.keys(this.props.questions).length !== 0 &&
      prevProps.questions !== this.props.questions
    ) {
      let userScores = this.formatUserScores(
        this.props.users,
        this.props.questions
      );
      this.setState({ userScores });
    }
  }

  render() {
    const { classes } = this.props;
    let renderValues = this.state.userScores.map((userScore) => (
      <Card key={userScore.author} className={classes.root}>
        <CardMedia className={classes.cover} image={userScore.avatarURL} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <div variant="h5" component="h2" className={classes.nonBadge}>
                  <Typography>{`${userScore.author}`}</Typography>
                </div>
                <div className={classes.nonBadge}>
                  <Typography>{`Answered Questions: ${userScore.votedQuestionNum}`}</Typography>
                </div>
                <div className={classes.nonBadge}>
                  <Typography>{`Created Questions ${userScore.createdQuestionNum}`}</Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <Card className={classes.scoreCard}>
                  <CardContent className={classes.scoreCardContent}>
                    <Typography variant="h5" component="h2">
                      Score
                    </Typography>
                    <Divider />
                    <Typography
                      variant="h5"
                      component="h2"
                      className={classes.score}
                    >
                      {userScore.score}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </div>
      </Card>
    ));
    return renderValues;
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
    questions: state.questionReducer.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
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
)(withRouter(withStyles(useStyles)(LeaderboardContainer)));
