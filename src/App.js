import React, { Component } from "react";
import SignUp from "./components/SignUp";
import { Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import { auth, createUserProfileDocument } from "./firebase/Firebase";
import Welcome from "./components/Welcome";
import { userStatus } from "./actions";
import { connect } from "react-redux";
export class App extends Component {
  unsubscribeFromOauth = null;
  componentDidMount() {
    this.unsubscribeFromOauth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.props.userStatus({
            ...snapshot.data(),
            id: snapshot.id,
          });
        });
      } else {
        this.props.userStatus(userAuth);
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromOauth();
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/" exact component={SignUp} />

          <Route path="/welcome" exact component={Welcome} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps, { userStatus })(App);
