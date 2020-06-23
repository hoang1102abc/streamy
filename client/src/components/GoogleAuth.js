import React from "react";
import { connect } from "react-redux";
import { signedIn, signedOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client: auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "247923573101-nm01spm5uqfeju5ltomdnsahisstfejb.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.authChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.authChange);
        });
    });
  }

  authChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signedIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signedOut();
    }
  };

  logoutUser = async () => {
    try {
      await this.auth.signOut();
    } catch (e) {
      console.log(e.message);
    }
  };

  loginUser = async () => {
    try {
      await this.auth.signIn();
    } catch (e) {
      console.log(e.message);
    }
  };

  renderButton = () => {
    if (this.auth !== "undefined" && this.props.isSignedIn === true) {
      return (
        <button className="ui google button red" onClick={this.logoutUser}>
          <i className="google icon "></i>
          Logout
        </button>
      );
    } else if (this.auth !== "undefined") {
      return (
        <button className="ui google button red" onClick={this.loginUser}>
          <i className="google icon "></i>
          Login with Google
        </button>
      );
    } else {
      return <div className="ui button loading"></div>;
    }
  };

  render() {
    return <div style={{ margin: "auto" }}>{this.renderButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signedIn, signedOut })(GoogleAuth);
