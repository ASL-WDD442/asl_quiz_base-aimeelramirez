/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import API from '../API';
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';

export default function container(Component, props) {

  class AuthContainer extends React.Component {
    state = {
      loggedIn: !!localStorage.getItem('token'),
      userId: "",
    }


    logout = () => {
      // localStorage.removeItem('token');
      localStorage.clear();
      // this.props.history.replace(window.location.pathname, { loggedIn: false, userId: null })
      if (this.props.history.location.state && this.props.history.location.state.loggedIn) {
        this.props.history.replace();
        this.props.location.state = {}
        console.log(this.props.location)

      }
      this.setState({ loggedIn: false });
      window.location.assign("https://www.google.com/accounts/logout?continue=https://appengine.google.com/_ah/logout?continue=https://localhost:3000/");
      // window.open(`https://www.google.com/accounts/logout`);

    }

    verifyGoogleCode = async (code) => {
      const data = await API.post('/auth/google', { code, url: process.env.REACT_APP_CALLBACK_URL });
      console.log("data==> ", data);
      //set items 
      let token = data.token;

      let loggedIn = true;
      //i could have stored it in stringify object but to read it easier.
      localStorage.setItem('token', token);
      // localStorage.setItem('userId', data.id);
      //headers to load if that to update.
      let userId = jwt_decode(localStorage.getItem('token'))
      console.log("google code : ", code)

      // props = { userId };
      // this.props.history.push("/admin/quizzes", { loggedIn: true, userId: userId })
      //set state
      this.setState({ loggedIn: true, userId: userId.id })
      return <Redirect to="/" />

      // window.location.reload()
    }

    fetchUserId = async () => {
      if (this.state.loggedIn) {
        let user = jwt_decode(localStorage.getItem('token'))
        const apiResponse = await API.get(`/auth/${user.id}`);
        console.log("Fetch user id: ", apiResponse);
        return apiResponse;
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