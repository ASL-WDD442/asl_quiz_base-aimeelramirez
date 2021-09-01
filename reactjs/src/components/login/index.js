import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../../containers/auth';
import API from './../../API';

class Login extends React.Component {
  constructor() {
    super();
    this.formRef = createRef();
    this.state = {
      email: "",
      password: "",
      loggedIn: !!localStorage.getItem('token'),
      userId: undefined
    }

  }
  componentDidMount() {
    const {
      location,
      verifyGoogleCode
    } = this.props;

    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) verifyGoogleCode(code);
  }


  redirectToGoogle = () => {
    let GOOGLE_URL = 'https://accounts.google.com/o/oauth2/v2/auth?';
    GOOGLE_URL += `client_id=${process.env.REACT_APP_CLIENT_ID}`;
    GOOGLE_URL += `&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`;
    GOOGLE_URL += '&response_type=code';
    GOOGLE_URL += '&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    window.location = GOOGLE_URL;

  }

  validateEmptyForm = (e) => {
    e.preventDefault();
    const formRef = this.formRef;
    if (formRef.current[0].value !== "" && formRef.current[0].value.length > 4) {
      this.setState({
        email: formRef.current[0].value
      });
    } else {
      console.log('Please fill a valid email/username.');
      return null && formRef.current[0].focus();
    }
    if (formRef.current[1].value !== "" && formRef.current[1].value.length >= 4) {
      this.setState({
        password: formRef.current[1].value
      });
    } else {
      console.log('Please fill out password more than 4 chars long.');
      return null && formRef.current[1].focus();

    }
  }
  loginHandle = async (e) => {
    e.preventDefault();
    let username = this.state.email;
    let password = this.state.password;

    const apiResponse = await API.post('/auth/login', {
      email: username,
      password: password
    })
    //read the response after sent body
    console.log("api: RES ", apiResponse)
    if (apiResponse.loggedIn === false) {
      console.log('User is not found.')
      //alert not the best way but gets the error to see if not console
      alert('User is not found.')
    } else {
      let userId = apiResponse.user.id;
      //set token only
      localStorage.setItem('token', apiResponse.token);

      this.setState({
        loggedIn: true,
        userId: userId,
        type: apiResponse.user.type
      });

      if (this.state.loggedIn && apiResponse.user.type === 'type2') {
        return <Redirect to="/admin/quizzes" /> && window.location.reload();
      }
      // if (this.state.loggedIn && apiResponse.user.type === 'type1') {
      //   return <Redirect to="/admin/quizzes" />
      // }
    }

  }

  render() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      return <Redirect to="/admin/quizzes" />
    }
    return (
      <>
        <h1 className={styles.heading}>Login</h1>
        <form method="POST" className={styles.form} ref={this.formRef} onChange={this.validateEmptyForm}>
          <label className={styles.form__label}>Email
            <input type="email" name="email" className={styles.form__input}></input>
          </label>
          <label className={styles.form__label}>Password
            <input type="password" name="password" className={styles.form__input}></input>
          </label>
          <button type="submit" className={[styles.button, styles.active].join(' ')} onClick={this.loginHandle}>Login</button>
        </form>
        <div>
          <h2>Social Login</h2>
          <button onClick={this.redirectToGoogle} className={styles.button}>
            <i className="fab fa-google"></i>
            <span>Login with Google</span>
          </button>
        </div>
      </>
    )
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
  userId: PropTypes.string,
  verifyGoogleCode: PropTypes.func.isRequired,
  location: RRPropTypes.location.isRequired,
  fetchUserId: PropTypes.func,


};

Login.defaultProps = {
  loggedIn: false,
};

export default AuthContainer(Login);