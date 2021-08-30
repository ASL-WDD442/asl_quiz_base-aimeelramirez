//example to find user id if that to be set.
import jwt_decode from "jwt-decode";
import API from './API';

const checkingUser = async () => {
    let checkLogged = !!localStorage.getItem('token');
    if (checkLogged) {
        let user = jwt_decode(localStorage.getItem('token'))
        const apiResponse = await API.get(`/auth/${user.id}`);
        let readStateUser = { userId: apiResponse.id, type: apiResponse.type };
        console.log("Application User:", readStateUser)
        return readStateUser;
    } else {
        console.log("Not signed in.")
    }

}
//to read user if that to be not sent to headers for securing info
export default checkingUser;

// //example to find user id if that to be set.
// import container from './containers/quizzes';


// /*probably not the best way but with export of container to 
// return class <Component> extends React.Component*/

// const exampleLiftingState = async () => {
//     let checkLogged = !!localStorage.getItem('token');
//     if (checkLogged) {
//         let LoggedUser = container();
//         // getting the method in  container() return QuizzesContainer  
//         let findUser = new LoggedUser({ 'userId': '', "type": "", loggedIn: !!localStorage.getItem('token') })
//         //dealing with promises if broken
//         let readStateUser = await findUser.fetchUserId();
//         console.log("Application User:", readStateUser)
//         return readStateUser;
//     }
// //to read user if that to be not sent to headers for securing info
// export default exampleLiftingState;