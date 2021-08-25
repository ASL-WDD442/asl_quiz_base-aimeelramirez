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
      localStorage.removeItem('token');
      this.setState({ loggedIn: false });
    }

    verifyGoogleCode = async (code) => {
      const data = await API.post('/auth/google', { code, url: process.env.REACT_APP_CALLBACK_URL });
      console.log(data)
      let token = data['token'];
      let loggedIn = data['loggedIn'];
      let userId = data['userId'];
      console.log(userId)
      localStorage.setItem('token', token);
      localStorage.setItem('id', userId);

      this.setState({ loggedIn });
    }

    // signup = async (user) => {
    //   const { token, loggedIn } = await API.post('/auth/signup', user);
    //   localStorage.setItem('token', token);
    //   this.setState({ loggedIn });
    // }

    render() {
      const { loggedIn, formRef } = this.state;
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