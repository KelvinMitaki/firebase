import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import { auth } from "../firebase/Firebase";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
export class Welcome extends Component {
  render() {
    if (!this.props.currentUser) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
        <Button
          onClick={() => {
            auth.signOut();
            return <Redirect to="/signin" />;
          }}
          variant="contained"
          color="secondary"
        >
          SIGN OUT
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(Welcome);
