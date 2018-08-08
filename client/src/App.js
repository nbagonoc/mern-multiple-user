import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

// COMPONENTS
// layout
import Navbar from "./components/layouts/Navbar";
// pages
import Home from "./components/home/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/user/dashboard/Dashboard";
import Moderator from "./components/user/moderator/Moderator";
import Admin from "./components/user/admin/Admin";
import NotFound from "./components/notfound/NotFound";
// guards
import NotAuth from "./components/guards/NotAuth";
import IsAuth from "./components/guards/IsAuth";
import IsModerator from "./components/guards/IsModerator";
import IsAdmin from "./components/guards/IsAdmin";

// ASSETS
import "./App.css";

// TOKEN CHECKER
// Checks the local storage if there's a token, and if it still valid
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get suer info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for epired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <NotAuth exact path="/register" component={Register} />
              <NotAuth exact path="/login" component={Login} />
              <IsAuth exact path="/dashboard" component={Dashboard} />
              <IsModerator exact path="/moderator" component={Moderator} />
              <IsAdmin exact path="/admin" component={Admin} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
