import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router-dom";

const useStyles = () => ({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
    color: "black",
  },
  textField: {
    width: "100%",
  },
  centerButton: {
    margin: "0 auto",
  },
});
class CreateQuestionCard extends React.Component {
  state = {
    optionOneText: null,
    optionTwoText: null,
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = () => {
    this.props.createQuestion({
      optionOneText: this.state.optionOneText,
      optionTwoText: this.state.optionTwoText,
      author: this.props.author.id,
    });
    this.props.history.push("/home");
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Create new Question
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7" component="h5">
                Complete the question:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" component="h5">
                Would you rather...
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="optionOneText"
                className={classes.textField}
                required
                id="standard1"
                label="Enter Option One Text Here"
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="optionTwoText"
                className={classes.textField}
                required
                id="standard2"
                label="Enter Option Two Text Here"
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            variant="contained"
            color="primary"
            className={classes.centerButton}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(withStyles(useStyles)(CreateQuestionCard));
