import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Main from "./components/Main";
import Login from "./components/auth/Login";
import Registration from "./components/Registration";
import "./styles/tailwind.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Preferences from "./components/profile_links/Preferences";
import EventDetails from "./components/EventDetails";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user,
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
    this.setState({ redirect: true });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
    });
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        this.props.handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/main"}
              render={(props) => (
                <Main
                  {...props}
                  user={this.state.user}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />

            <Route
              exact
              path={"/log-in"}
              render={(props) => (
                <Login
                  {...props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                  user={this.state.user}
                />
              )}
            />

            <Route
              exact
              path={"/registration"}
              render={(props) => (
                <Registration
                  {...props}
                  handleSuccessfulAuth={this.handleSuccessfulAuth}
                  loggedInStatus={this.state.loggedInStatus}
                  handleLogin={this.handleLogin}
                  user={this.state.user}
                />
              )}
            />

            <Route
              exact
              path={"/profile"}
              render={(props) => (
                <Profile
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                />
              )}
            />

            <Route
              exact 
              path ="/event/:id"
              component={match =>
                <EventDetails
                  match={match}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                  user={this.state.user}
                />
              }
            />

            <Navbar
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              loggedInStatus={this.state.loggedInStatus}
              handleLogin={this.handleLogin}
              user={this.state.user}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
