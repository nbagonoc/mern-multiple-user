import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

// ASSETS
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/moderator" component={Moderator} />
              <Route exact path="/admin" component={Admin} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
