/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';
import exampleLiftingState from '../app.user';
//to pass userId for example
export default function container(Component) {
  return class QuizContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        quiz: {},
        questions: [],
        userId: ""
      }
    }
    fetchQuiz = async (id) => {
      let user = await exampleLiftingState();
      let userId = user.userId;
      const quiz = await API.get(`/quizzes/${id}`);
      const questions = await API.get(`/questions?quizId=${id}`)
      if (questions) {
        questions.forEach(async (question) => {
          question.choices = await API.get(`/choices?questionId=${question.id}`);
        })
        this.setState({ quiz, questions, userId });
      }
      this.setState({ quiz, userId });

    }

    saveQuiz = async (quiz) => {
      if (quiz.id === void 0) {
        //passing in userId if empty
        // console.log(quiz.userId)
        const sendQuiz = await API.post('/quizzes', { quiz: quiz });
        return sendQuiz;
      } else {
        const sendQuiz = await API.put(`/quizzes/${quiz.id}`, { quiz: quiz });
        return sendQuiz;
      }
    }

    deleteQuiz = async (id) => {
      await API.delete(`/quizzes/${id}`);

    }

    render() {
      const { quiz, questions, userId } = this.state;
      // if (userId) {
      //   //check the state of item quiz
      //   console.log(this.state)
      // }
      return (
        <Component
          {...this.props}
          quiz={quiz}
          userId={userId}
          questions={questions}
          fetchQuiz={this.fetchQuiz}
          saveQuiz={this.saveQuiz}
          deleteQuiz={this.deleteQuiz}
        />
      );
    }
  };
}