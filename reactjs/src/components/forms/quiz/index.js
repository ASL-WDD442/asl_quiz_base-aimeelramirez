import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuizContainer from '../../../containers/quiz';

class QuizForm extends React.Component {
  constructor(props) {
    super(props);
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
    const { quiz: { id, userId }, saveQuiz, history } = this.props;

    let filterInput = [...this.radioRef.current.children];
    filterInput = filterInput.filter(item => {
      if (item.type !== "radio") return null;
      return item;
    })
    const { name, type = filterInput[0].checked ? filterInput[0].value : filterInput[1].value } = this.state;
    if (id !== void 0) {
      // console.log(id)
      const data = await saveQuiz({ id: id, name: name, type: type, userId: userId });
      console.log(data)
      history.push(`/admin/quizzes/${id}`);

    } else {
      let userId = localStorage.getItem('userId');
      console.log(userId)
      const data = await saveQuiz({ name, type, userId });
      console.log(data);
      history.push(`/admin/quizzes/${data.id}`);

    }
  }

  render() {
    const { quiz: { id, name: defaultName = '', type: defaultType = 'public' } } = this.props;
    const { name = defaultName, type = defaultType } = this.state;

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
              // id="type"
              checked={type === 'public'}
              className={styles.form__input__radio}
              onChange={this.handleInputChange} />
            <label>Public</label>

            {/* <label className={styles.form__labelInline} htmlFor="type"> */}
            <input
              type="radio"
              name="type"
              value="private"
              // id="type"
              checked={type === 'private'}
              className={styles.form__input__radio}
              onChange={this.handleInputChange} />
            <label>Private</label>
            {/* </label> */}
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