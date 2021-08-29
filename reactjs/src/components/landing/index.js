import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import Link from '../link';
import QuizzesContainer from '../../containers/quizzes';
import exampleLiftingState from '../../app.user';

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      user: ""
    }
  }
  componentDidMount = async () => {
    const { fetchPublicQuizzes } = this.props;
    fetchPublicQuizzes();
    this.setState({ user: await exampleLiftingState() })
  }
  render() {
    //getting container for QuizzesContainer(Landing) 
    //or could use exampleLiftingState or , fetchUserId
    const { publicQuizzes, loggedIn } = this.props;
    let buttonCreateQuiz = "";
    if (loggedIn) {
      buttonCreateQuiz = <Link url='/admin/quizzes/new' title='Create Your Own Quiz' icon='' className='button primary' />
    } else {
      buttonCreateQuiz = null
    }
    return (
      <>
        <label className="blocks" data-name="about">
          {this.state.user ? `UserID: ${this.state.user.userId}` : null}</label>
        <h2 className={styles.heading}>Welcome to Lyrical Trivia!</h2>
        <h2 className={styles.headingSecondary}>Want to play a lyrical trivia?</h2>
        <p>Check out the quizzes created by others below for a challenging and fun experience</p>
        <h2 className={styles.headingSecondary}>Want to test your friend's knowledge?</h2>
        {buttonCreateQuiz}
        <h1 className={styles.heading}>Public Quizzes</h1>
        <ul className={styles.list}>
          {publicQuizzes.map(quiz => (
            <li className={styles.list__item} key={quiz.id}>
              <span className={styles.list__item__title}>{quiz.name}</span>
              <Link url={`/quizzes/${quiz.id}`} title='View' icon='fa-eye' />
            </li>
          ))}
        </ul>
        {buttonCreateQuiz}
      </>
    );
  }
}

Landing.propTypes = {
  publicQuizzes: PropTypes.arrayOf(PropTypes.object),
  fetchPublicQuizzes: PropTypes.func.isRequired,
  fetchUserId: PropTypes.func,
  userId: PropTypes.string,
  loggedIn: PropTypes.bool

};

Landing.defaultProps = {
  publicQuizzes: [],

};

export default QuizzesContainer(Landing);