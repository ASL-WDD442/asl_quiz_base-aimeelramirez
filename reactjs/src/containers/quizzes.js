/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';
import checkingUser from '../app.user';
export default function container(Component, props) {
  return class QuizzesContainer extends React.Component {
    constructor() {
      super();
      this.state = {
        userQuizzes: [],
        publicQuizzes: [],
        userId: "",
        loggedIn: false,
        type: undefined
      }
    }

    fetchUserQuizzes = async () => {
      let user = await checkingUser();
      let userId = user.userId;
      let userQuizzes = await API.get(`/quizzes/?userId=${userId}`);
      userQuizzes = userQuizzes.filter(user => {
        if (userId !== user.userId) return null;
        return user;
      })
      // console.log("fetch user quizzes:", userQuizzes)
      this.setState({ userQuizzes, userId });
    }

    fetchPublicQuizzes = async () => {
      const publicQuizzes = await API.get('/quizzes/public');
      let userId = this.state.userId;
      this.setState({ publicQuizzes, userId });
    }
    render() {
      const { userQuizzes, publicQuizzes, userId } = this.state;
      // console.log("State on Quizzes: ", userId)
      return (
        <Component
          {...this.props}
          userId={userId}
          userQuizzes={userQuizzes}
          publicQuizzes={publicQuizzes}
          fetchUserId={this.fetchUserId}
          fetchPublicQuizzes={this.fetchPublicQuizzes}
          fetchUserQuizzes={this.fetchUserQuizzes}
        />
      );
    }
  };
}