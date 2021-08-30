import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuizContainer from '../../../containers/quiz';
import checkingUser from '../../../app.user';
class QuizForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: undefined,
      type: undefined,
      userId: undefined,
    }
    this.formRef = createRef();
    this.radioRef = createRef();
  }

  componentDidMount() {
    const { fetchQuiz, match: { params: { id } } } = this.props;
    if (id) return fetchQuiz(id);
  }

  handleInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  save = async (event) => {
    event.preventDefault();
    console.log('clicker ')
    let { quiz: { id, userId }, saveQuiz, history } = this.props;
    // console.log("id:", id)
    // console.log("userId:", userId)
    const applyChanges = async (userId, id) => {
      let filterInput = [...this.radioRef.current.children];
      filterInput = filterInput.filter(item => {
        if (item.type !== "radio") return null;
        return item;
      })
      const { name, type = filterInput[0].checked ? filterInput[0].value : filterInput[1].value } = this.state;

      if (id !== void 0) {
        //get the method saveQuiz in containers dir
        const data = await saveQuiz({ id: id, name: name, type: type, userId: userId });
        console.log("check on update quiz:", data)
        history.push(`/admin/quizzes/${id}`);

      } else {
        const data = await saveQuiz({ name, type, userId: userId });
        console.log("check on new quiz:", data)
        history.push(`/admin/quizzes/${data.id}`);

      }
    }
    if (!userId) {
      //set user if not created
      let user = await checkingUser();
      userId = user.userId;
      await applyChanges(userId, id);
    } else {
      await applyChanges(userId, id);
    }

  }

  render() {
    const { quiz: { id, name: defaultName = '', type: defaultType = 'public' } } = this.props;
    const { name = defaultName, type = defaultType } = this.state;
    // const { userId } = this.props;
    // if (userId) {
    //   //if wanting to checkout on props
    //   console.log("Quiz", this.props)
    // }
    return (
      <>
        <h1 className={styles.heading}>{id ? 'Edit Quiz' : 'New Quiz'}</h1>
        <form method="POST" className={styles.form} onSubmit={this.save} ref={this.formRef}>
          <label className={styles.form__label} htmlFor="name">Quiz Name
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              className={styles.form__input}
              onChange={this.handleInputChange} />
          </label>
          <span className={styles.form__labelInline}>Quiz Type</span>
          <section className={styles.form__label} htmlFor="type" ref={this.radioRef}>
            {/* <label className={styles.form__labelInline}> */}
            <input
              type="radio"
              name="type"
              value="public"
              checked={type === 'public'}
              className={styles.form__input__radio}
              onChange={this.handleInputChange} />
            <label>Public</label>
            <input
              type="radio"
              name="type"
              value="private"
              checked={type === 'private'}
              className={styles.form__input__radio}
              onChange={this.handleInputChange} />
            <label>Private</label>
          </section>
          <button type="submit" className={[styles.button, styles.active].join(' ')}>{name ? 'Save Quiz' : 'Create Quiz'}</button>
        </form>
      </>
    )
  }
}

QuizForm.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
  }),
  saveQuiz: PropTypes.func.isRequired,
  fetchQuiz: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};
QuizForm.defaultProps = {
  quiz: {},
}

export default QuizContainer(QuizForm);