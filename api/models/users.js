
// Users:

// id
// username
// password hashed...
// access_token
// type
//if params to be passing  in options

const GetUser = () => {
    const User = [
        {
            id: 0,
            username: "aimee",
            password: "7f4455f0fa9a5a03:bce63b8acc9b664cbbe315b4b8692c24f08089e9d3b7a1f8",
            access_token: '',
            type: ''
        }
    ]
    return User;
}
module.exports = {
    users: GetUser()

}