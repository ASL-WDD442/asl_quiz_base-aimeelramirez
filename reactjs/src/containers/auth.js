/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import API from '../API';
import { Redirect } from 'react-router-dom';
import exampleLiftingState from '../app.user';
import LoggedUser from './../components/header/index';
export default function container(Component) {
  class AuthContainer extends React.Component {
    constructor() {
      super();
      this.state = {
        loggedIn: !!localStorage.getItem('token'),
        userId: "",

      }
    }

    logout = async () => {
      let user = await exampleLiftingState();
      let userType = user.type;
      console.log(userType)
      const { history } = this.props;
      if (userType === 'type1') {
        localStorage.clear();
        this.setState({ loggedIn: false });
        window.location.assign("https://www.google.com/accounts/logout?continue=https://appengine.google.com/_ah/logout?continue=https://localhost:3000/");
        localStorage.clear();

        history.replace();
        this.props.location.state = {}
        // return window.location.reload();

      } else if (userType === 'type2') {
        localStorage.clear();
        history.replace();
        this.props.location.state = {}
        return window.location.reload();

      }

    }

    verifyGoogleCode = async (code) => {
      const data = await API.post('/auth/google', { code, url: process.env.REACT_APP_CALLBACK_URL });
      console.log("data==> ", data);
      //set items 
      let token = data.token;
      let userId = data.id;
      let loggedIn = true;
      localStorage.setItem('token', token);
      //set state
      if (token) {
        this.setState({ loggedIn: loggedIn, userId: userId })
        //if to see the header not refreshing...
        let findUser = new LoggedUser({ loggedIn: !!localStorage.getItem('token') })
        if (!findUser.loggedIn) {
          window.location.reload()
          return findUser
        }
        console.log("Auth: ", this.props)
        return <Redirect to="/admin/quizzes" />
      }
    }
    render() {
      const { loggedIn, userId } = this.state;
      return (
        <Component
          {...this.props}
          loggedIn={loggedIn}
          userId={userId}
          logout={this.logout}
          fetchUserId={this.fetchUserId}
          verifyGoogleCode={this.verifyGoogleCode}
        />
      );
    }
  }
  return AuthContainer;
}

