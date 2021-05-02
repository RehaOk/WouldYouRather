import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import * as data from "../../_DATA";
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
    this.props.createLoginState({
      isLoggedIn: true,
      authUser: this.state.users[this.state.selectedUser],
    });
    this.props.history.push("/home");
  };

  requestUsers = () => {
    data._getUsers().then((users) => {
      let reqUsers = [];
      Object.keys(users).forEach((user) => {
        reqUsers.push(users[user]);
      });
      this.setState({ selectBoxUsers: reqUsers, users });
    });
  };

  componentDidMount() {
    this.requestUsers();
  }

  render() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/home");
      return null;
    }
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
    isLoggedIn: state.authReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createLoginState: (payload) => {
      dispatch(actions.createLoginState(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(LoginContainer)));
