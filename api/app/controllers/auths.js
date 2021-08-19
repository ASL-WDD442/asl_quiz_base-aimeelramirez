
const { Users } = require('../models')

exports.getAll = async (req, res) => {
    let users = await Users.findAll();
    res.json(users)

}

exports.getOneById = async ({ params: { id } }, res) => {
    const user = Users.findByPk(id)
    if (!user.length) {
        res.sendStatus(404); return;
    }
    res.json(user);

}

exports.login = async ({ body: { username, password } }, res) => {
    const user = await Users.getLogin({ username, password })
    if (!user.length) {
        res.sendStatus(404); return;
    }
    res.json(user);

}
exports.createToken = async ({ body: { username, password, access_token, type } }, res) => {
    const user = await Users.findByToken({ username, password, access_token, type })
    if (!user.length) {
        res.sendStatus(404); return;
    }
    res.json(user);

}

exports.createUser = async ({ body: { username, password, access_token, type } }, res) => {
    const id = await Users.createAUser({ username, password, access_token, type });
    res.json(id)
}

exports.updateUser = async ({ params: { id }, body: body }, res) => {
    const updatedUser = await Users.update(body, id);
    res.json(updatedUser)
}

exports.deleteUser = async ({ params: { id } }, res) => {
    await Users.destroy(id);
    res.sendStatus(200)
}

