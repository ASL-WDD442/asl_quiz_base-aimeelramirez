
const { Users } = require('../models')

exports.getAll = (req, res) => {
    let users = Users.findAll();
    res.json(users)

}

exports.getOneById = ({ params: { id } }, res) => {
    const user = Users.findByPk(id)
    if (!user.length) {
        res.sendStatus(404); return;
    }
    res.json(user);

}

exports.login = ({ body: { username, password } }, res) => {
    const user = Users.getLogin({ username, password })
    if (!user.length) {
        res.sendStatus(404); return;
    }
    res.json(user);

}
exports.createToken = ({ body: { username, password, access_token, type } }, res) => {
    const user = Users.findByToken({ username, password, access_token, type })
    if (!user.length) {
        res.sendStatus(404); return;
    }
    res.json(user);

}

exports.createUser = ({ body: { username, password, access_token, type } }, res) => {
    const id = Users.createAUser({ username, password, access_token, type });
    res.json(id)
}

exports.updateUser = ({ params: { id }, body: body }, res) => {
    const updatedUser = Users.update(body, id);
    res.json(updatedUser)
}

exports.deleteUser = ({ params: { id } }, res) => {
    Users.destroy(id);
    res.sendStatus(200)
}

