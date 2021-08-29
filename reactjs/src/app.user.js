//example to find user id if that to be set in storing.
import jwt_decode from "jwt-decode";
import API from './API';

const exampleLiftingState = async () => {
    let checkLogged = !!localStorage.getItem('token');
    if (checkLogged) {
        let user = jwt_decode(localStorage.getItem('token'))
        const apiResponse = await API.get(`/auth/${user.id}`);
        let readStateUser = { userId: apiResponse.id, type: apiResponse.type };
        console.log("Application User:", readStateUser)
        return readStateUser;
    }
}
//to read user if that to be not sent to headers for securing info
export default exampleLiftingState;