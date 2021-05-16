import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import AppBarContainer from "./containers/AppBarContainer";
import LoginContainer from "./containers/LoginContainer";
import QuestionContainer from "./containers/QuestionContainer";
import ResultContainer from "./containers/ResultContainer";
import CreateQuestionContainer from "./containers/CreateQuestionContainer";
import LeaderboardContainer from "./containers/LeaderboardContainer";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";

const RenderGuard = (props) => {
  if (props.isLoggedIn) {
    return props.children;
  } else {
    return (
      <Redirect
        to={{
          pathname: `/redirect${window.location.pathname}`,
        }}
      />
    );
  }
};

class App extends React.Component {
  render() {
    return (
      <>
        <AppBarContainer />
        <Switch>
          <Route exact path="/">
            <LoginContainer />
          </Route>
          <Route path="/redirect/:path">
            <LoginContainer />
          </Route>
          <Route exact path="/home">
            <RenderGuard isLoggedIn={this.props.isLoggedIn}>
              <HomeContainer />
            </RenderGuard>
          </Route>
          <Route exact path="/add">
            <RenderGuard isLoggedIn={this.props.isLoggedIn}>
              <CreateQuestionContainer />
            </RenderGuard>
          </Route>
          <Route exact path="/questions/:id">
            <RenderGuard isLoggedIn={this.props.isLoggedIn}>
              <QuestionContainer />
            </RenderGuard>
          </Route>
          <Route exact path="/results/:id">
            <RenderGuard isLoggedIn={this.props.isLoggedIn}>
              <ResultContainer />
            </RenderGuard>
          </Route>
          <Route exact path="/leaderboard">
            <RenderGuard isLoggedIn={this.props.isLoggedIn}>
              <LeaderboardContainer />
            </RenderGuard>
          </Route>
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
