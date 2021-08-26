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
      // localStorage.setItem('data', JSON.stringify(data));
      let token = data.token;
      localStorage.setItem('token', token);
      console.log(token)
      let loggedIn = true;
      this.setState({ loggedIn });
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