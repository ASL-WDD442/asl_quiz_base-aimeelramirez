/* eslint-disable react/state-in-constructor */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import API from '../API';
import jwt_decode from "jwt-decode";

export default function container(Component) {
  return class QuizzesContainer extends React.Component {
    state = {
      userQuizzes: [],
      publicQuizzes: [],
      userId: ""
    }
    fetchUserQuizzes = async () => {
      let user = jwt_decode(localStorage.getItem('token'))
      let userId = user.id;
      // userId = this.props.location.state.userId;
      // userId = localStorage.getItem('userId');
      let userQuizzes = await API.get(`/quizzes/?userId=${userId}`);
      userQuizzes = userQuizzes.filter(user => {
        if (userId !== user.userId) return null;
        return user;
      })
      this.setState({ userQuizzes, userId });
    }

    fetchPublicQuizzes = async () => {
      const publicQuizzes = await API.get('/quizzes/public');
      let userId = this.state.userId;
      this.setState({ publicQuizzes, userId });
    }
    fetchUserId = async () => {
      const { loggedIn } = this.props
      if (loggedIn) {
        let user = jwt_decode(localStorage.getItem('token'))
        const apiResponse = await API.get(`/auth/${user.id}`);
        console.log("Fetch user id: ", apiResponse);
        return apiResponse;
      }
    }

    render() {
      const { userQuizzes, publicQuizzes, userId } = this.state;
      console.log("State on Quizzes: ", userId)
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