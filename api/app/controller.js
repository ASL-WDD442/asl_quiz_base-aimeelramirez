
const { Users } = require('./../models')

getAll = (req, res) => {
    const { id } = req.query
    const users = Users.getAll(id)
    res.json(users)
    console.log('getting controllers on users all.')
}

postUser = (req, res) => {
    let token = req.headers['authorization'];
    console.log(token)
    const { username, password } = req.body
    const id = Users.create({ username, password })
    res.json({ id })
}

getUserId = (req, res) => {
    const { id } = req.params
    const user = Users.findById(id)
    if (!user) {
        res.sendStatus(404)
        return;
    }
    res.json(user)

}

const Auth = {
    getUserId: getUserId,
    getAll: getAll,
    postUser: postUser
}
module.exports = Auth