import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import * as actions from "../../redux/actions";

import { Link } from "react-router-dom";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleSpacing: {
    display: "flex",
    flexGrow: 2,
    justifyContent: "space-around",
    marginLeft: 400,
  },
});

class AppBarContainer extends React.Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, open: false });
  };

  handleLogout = () => {
    this.setState({ anchorEl: null, open: false });
    this.props.createLoginState({ isLoggedIn: false, authUser: null });
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {this.props.isLoggedIn && (
              <>
                <div className={classes.titleSpacing}>
                  <Link to="/">
                    <Typography variant="h6" className={classes.title}>
                      Home
                    </Typography>
                  </Link>
                  <Link to="/add">
                    <Typography variant="h6" className={classes.title}>
                      New Question
                    </Typography>
                  </Link>
                  <Link to="/leaderboard">
                    <Typography variant="h6" className={classes.title}>
                      Leader Board
                    </Typography>
                  </Link>
                </div>
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(event) => this.handleMenu(event)}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={this.state.open}
                    onClose={() => this.handleClose()}
                  >
                    <MenuItem>
                      Profile: {`${this.props.authUser.name}`}
                    </MenuItem>
                    <MenuItem onClick={(event) => this.handleLogout(event)}>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
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
    createLoginState: (payload) => {
      dispatch(actions.createLoginState(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(AppBarContainer)));
