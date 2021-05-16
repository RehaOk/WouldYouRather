import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import CreateQuestionCard from "../../components/CreateQuestionCard";
import * as actions from "../../redux/actions";

const useStyles = () => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexGrow: 1,
  },
});

class QuestionContainer extends React.Component {
  render() {
    const { classes } = this.props;
    // const id = this.props.match.params.id;
    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={5}>
          <CreateQuestionCard
            author={this.props.user}
            createQuestion={this.props.actions.createQuestion}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questionReducer.questions,
    user: state.authReducer.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      createQuestion: (payload) => {
        dispatch(actions.createQuestion(payload));
      },
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(QuestionContainer)));
