
const { Users } = require('../models')

exports.getAll = (res) => {
    const users = Users.findAll();
    res.json(users)

}

exports.getOneById = ({ params: { id } }, res) => {
    const user = Users.findByPk(id)
    if (!user.length) {
        res.sendStatus(404); return;
    }
    res.json(user);

}

exports.createUser = ({ body: body }, res) => {
    const id = Users.create({ body });
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

