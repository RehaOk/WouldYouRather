import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 300,
    height: 192,
  },
});

class PollResultCard extends React.Component {
  viewPoll = (questionId) => {
    this.props.history.push(`results/${questionId}`);
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={this.props.avatarURL} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {this.props.author} asks:
            </Typography>
            <Typography variant="h5" component="h2">
              Would you rather
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              do {this.props.optionOne} ?
            </Typography>
            <Typography variant="body2" component="p">
              do {this.props.optionTwo} ?
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => this.viewPoll(this.props.questionId)}
            >
              View Poll
            </Button>
          </CardActions>
        </div>
      </Card>
    );
  }
}

export default withRouter(withStyles(useStyles)(PollResultCard));
