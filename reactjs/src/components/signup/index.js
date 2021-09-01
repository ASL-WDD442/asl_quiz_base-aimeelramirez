import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../../containers/auth';
import API from './../../API';

class Signup extends React.Component {
  constructor() {
    super();
    this.formRef = createRef();
    this.state = {
      email: "",
      password: "",
      loggedIn: !!localStorage.getItem('token')


    }

  }

  signUp = async (e) => {
    e.preventDefault();
    console.log(this.formRef.current);
    let filterInput = [...this.formRef.current.children];
    filterInput = filterInput.filter(item => {
      if (!item.getAttribute('type')) return null;
      return item;
    })
    let user = { name: filterInput[0].value, email: filterInput[1].value, password: filterInput[2].value }
    const { token, loggedIn, userId } = await API.post('/auth/signup', user);
    localStorage.setItem('token', token);
    console.log('userId on sign up :', userId)
    console.log(loggedIn)
    this.setState({ loggedIn });
    return window.location.reload();
  }

  render() {
    const { loggedIn } = this.props;
    if (loggedIn) return <Redirect to="/admin/quizzes" />
    return (
      <>
        <h1 className={styles.heading}>Sign Up</h1>
        <form method="POST" className={styles.form} ref={this.formRef}>
          <label className={styles.form__label}>Name   </label>
          <input type="text" name="name" className={styles.form__input}></input>

          <label className={styles.form__label}>Email  </label>
          <input type="email" name="email" className={styles.form__input}></input>

          <label className={styles.form__label}>Password   </label>
          <input type="password" name="password" className={styles.form__input}></input>

          <button type="submit" onClick={this.signUp} className={[styles.button, styles.active].join(' ')}>Sign Up</button>
        </form>
      </>
    )
  }
}

Signup.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.object
};

Signup.defaultProps = {
  loggedIn: false,
  user: {}
};

export default AuthContainer(Signup);