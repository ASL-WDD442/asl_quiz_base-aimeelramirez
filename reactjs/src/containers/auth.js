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
      // this.props.history.replace(window.location.pathname, { loggedIn: false, userId: null })
      if (this.props.history.location.state && this.props.history.location.state.loggedIn) {
        this.props.history.replace();
        this.props.location.state = {}
        console.log(this.props.location)

      }
      this.setState({ loggedIn: false });
      console.log(this.props)
    }

    verifyGoogleCode = async (code) => {
      const data = await API.post('/auth/google', { code, url: process.env.REACT_APP_CALLBACK_URL });
      // console.log("data==> ", data);
      //set items 
      let token = data.token;
      // let userId = data.id;
      const { userId = data.id } = this.props;

      let loggedIn = true;
      //i could have stored it in stringify object but to read it easier.
      localStorage.setItem('token', token);
      // localStorage.setItem('userId', userId);
      this.setState({ loggedIn });
      //headers to load if that to update.
      this.props.history.push("/admin/quizzes", { loggedIn: true, userId: userId })

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