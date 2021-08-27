/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuizzesContainer extends React.Component {
    state = {
      userQuizzes: [],
      publicQuizzes: [],
    }
    fetchUserQuizzes = async () => {
      let userId = localStorage.getItem('userId');
      let userQuizzes = await API.get(`/quizzes/?userId=${userId}`);
      userQuizzes = userQuizzes.filter(user => {
        if (userId !== user.userId) return null;
        return user;
      })
      this.setState({ userQuizzes });
    }

    fetchPublicQuizzes = async () => {
      const publicQuizzes = await API.get('/quizzes/public');
      this.setState({ publicQuizzes });
    }

    render() {
      const { userQuizzes, publicQuizzes } = this.state;
      return (
        <Component
          {...this.props}
          userQuizzes={userQuizzes}
          publicQuizzes={publicQuizzes}
          fetchPublicQuizzes={this.fetchPublicQuizzes}
          fetchUserQuizzes={this.fetchUserQuizzes}
        />
      );
    }
  };
}