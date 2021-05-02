import "./App.css";
import HomeContainer from "./containers/HomeContainer";
import AppBarContainer from "./containers/AppBarContainer";
import LoginContainer from "./containers/LoginContainer";
import QuestionContainer from "./containers/QuestionContainer";
import ResultContainer from "./containers/ResultContainer";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import * as actions from "./redux/actions";
class App extends React.Component {
  render() {
    return (
      <>
        <AppBarContainer />
        <Switch>
          <Route exact path="/">
            <LoginContainer />
          </Route>
          <Route exact path="/home">
            <HomeContainer />
          </Route>
          <Route exact path="/add">
            <>New Question</>
          </Route>
          <Route exact path="/questions/:id">
            <QuestionContainer />
          </Route>
          <Route exact path="/results/:id">
            <ResultContainer />
          </Route>
          <Route exact path="/leaderboard">
            <>LeaderBoard</>
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
