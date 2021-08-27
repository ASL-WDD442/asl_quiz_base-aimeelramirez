/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import API from '../API';

export default function container(Component) {

  class AuthContainer extends React.Component {
    state = {
      loggedIn: !!localStorage.getItem('token'),
    }
    logout = () => {
      // localStorage.removeItem('token');
      localStorage.clear();
      this.setState({ loggedIn: false });
    }

    verifyGoogleCode = async (code) => {
      const data = await API.post('/auth/google', { code, url: process.env.REACT_APP_CALLBACK_URL });
      // console.log("data==> ", data);
      //set items 
      let token = data.token;
      let userId = data.id;
      let loggedIn = true;
      //i could have stored it in stringify object but to read it easier.
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      this.setState({ loggedIn });
      //headers to load if that to update.
      return this.state.loggedIn && window.location.reload();
    }


    render() {
      const { loggedIn } = this.state;
      return (
        <Component
          {...this.props}
          loggedIn={loggedIn}
          logout={this.logout}
          verifyGoogleCode={this.verifyGoogleCode}
        />
      );
    }
  }
  return AuthContainer;
}