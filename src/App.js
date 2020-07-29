import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Nav from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Classes from "./Classes";
import SecureRoute from "./SecureRoute";
import AuthContext from "./Auth/AuthContext";
import About from "./About";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false,
    };
  }

  componentDidMount() {
    this.state.auth.renewToken(() =>
      this.setState({ tokenRenewalComplete: true })
    );
  }

  render() {
    const { auth } = this.state;
    if (!this.state.tokenRenewalComplete) return "Loading...";
    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={(props) => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={(props) => <Callback auth={auth} {...props} />}
          />

          <Route path="/about" component={About} />

          <SecureRoute path="/profile" component={Profile} />

          <SecureRoute
            path="/classes"
            component={Classes}
            scopes={["read:classes"]}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
