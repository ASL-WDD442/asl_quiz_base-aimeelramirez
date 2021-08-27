/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuizContainer extends React.Component {
    state = {
      quiz: {},
      questions: [],
    }
    //TODO get the route to only path on  console.log(await req.API.get(`/quizzes?userId=${userId}`));

    fetchQuiz = async (id) => {
      // const quizzes = await API.get(`/quizzes`);
      const quiz = await API.get(`/quizzes/${id}`);
      const questions = await API.get(`/questions?quizId=${id}`)
      if (questions) {
        questions.forEach(async (question) => {
          question.choices = await API.get(`/choices?questionId=${question.id}`);
        })
        this.setState({ quiz, questions });
      }
      this.setState({ quiz });

    }

    saveQuiz = async (quiz) => {
      if (quiz.id === void 0) {
        console.log(quiz)
        const sendQuiz = await API.post('/quizzes', { quiz: quiz });
        return sendQuiz;
      } else {
        const sendQuiz = await API.put(`/quizzes/${quiz.id}`, { quiz: quiz });
        // console.log(sendQuiz)
        return sendQuiz;
      }
    }

    deleteQuiz = async (id) => {
      await API.delete(`/quizzes/${id}`);

    }

    render() {
      const { quiz, questions } = this.state;
      return (
        <Component
          {...this.props}
          quiz={quiz}
          questions={questions}
          fetchQuiz={this.fetchQuiz}
          saveQuiz={this.saveQuiz}
          deleteQuiz={this.deleteQuiz}
        />
      );
    }
  };
}