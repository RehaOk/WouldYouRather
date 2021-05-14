import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Badge from "@material-ui/core/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import * as data from "../_DATA";

const useStyles = () => ({
  root: {
    width: 650,
    margin: "10px auto",
    top: 10,
    position: "relative",
    display: "flex",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
    justifyContent: "center",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 300,
    height: 192,
  },
  resultContainer: {
    border: "2px solid #137127de",
    width: "100%",
  },
  badge: {
    width: "90%",
    height: 70,
  },
  nonBadge: {
    width: "90%",
    height: 70,
  },
});

class LinearProgressWithLabel extends React.Component {
  render() {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...this.props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            this.props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
}

class PollAnswerCard extends React.Component {
  state = {
    optionOnePercentage: 0,
    optionTwoPercentage: 0,
  };

  getResultPercentages = () => {
    Object.keys(this.props.questions).forEach((questionKey) => {
      if (this.props.questions[questionKey].id === this.props.questionId) {
        let optOneLen =
          this.props.questions[questionKey].optionOne.votes.length;
        let optTwoLen =
          this.props.questions[questionKey].optionTwo.votes.length;
        let total = optOneLen + optTwoLen;
        let optionOnePercentage = (100 / total) * optOneLen;
        let optionTwoPercentage = (100 / total) * optTwoLen;
        this.setState({
          optionOnePercentage,
          optionTwoPercentage,
        });
      }
    });
  };

  componentDidMount() {
    this.getResultPercentages();
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={this.props.avatarURL} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h2">
              Results:
            </Typography>
            <div>
              {this.state.answer === "optionOne" ? (
                <Badge
                  className={classes.badge}
                  badgeContent="Your Vote"
                  color="primary"
                >
                  <div className={classes.resultContainer}>
                    <Typography>{this.props.optionOne}</Typography>
                    <LinearProgressWithLabel
                      value={this.state.optionOnePercentage}
                    />
                  </div>
                </Badge>
              ) : (
                <div className={classes.nonBadge}>
                  <Typography>{this.props.optionOne}</Typography>
                  <LinearProgressWithLabel
                    value={this.state.optionOnePercentage}
                  />
                </div>
              )}
              {this.state.answer === "optionTwo" ? (
                <Badge
                  className={classes.badge}
                  badgeContent="Your Vote"
                  color="primary"
                >
                  <div className={classes.resultContainer}>
                    <Typography>{this.props.optionTwo}</Typography>
                    <LinearProgressWithLabel
                      value={this.state.optionTwoPercentage}
                    />
                  </div>
                </Badge>
              ) : (
                <div className={classes.nonBadge}>
                  <Typography>{this.props.optionTwo}</Typography>
                  <LinearProgressWithLabel
                    value={this.state.optionTwoPercentage}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authReducer.authUser,
    questions: state.questionReducer.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(PollAnswerCard)));
