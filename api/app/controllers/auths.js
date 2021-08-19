
const { Users } = require('../models')

exports.getAll = async (req, res) => {
    let users = await Users.findAll();
    console.log('users==> ', users)
    res.json(users)

}

exports.getOneById = async ({ params: { id } }, res) => {
    const user = await Users.findByPk(id)
    if (!user) {
        res.sendStatus(404); return;
    }
    res.json(user);

}
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [, [updateUser]] = await Users.update(req.body, {
            where: { id },
            returning: true,
        });
        res.json(updateUser);
    } catch (e) {
        const errors = e.errors.map((err) => err.message);
        res.sendStatus(400).json({ errors });
    }
};


exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newChoice = await Users.createAUser({ username, password, access_token, type })
        res.json({ id: newChoice });
    } catch (e) {
        const errors = e.errors.map((err) => err.message);
        res.sendStatus(400).json({ errors });
    }
};


// exports.createUser = async ({ body: { username, password, access_token, type } }, res) => {
//     const id = await Users.createAUser({ username, password, access_token, type });
//     res.json(id)
// }

// exports.updateUser = async ({ params: { id }, body: body }, res) => {
//     const updatedUser = await Users.update(body, id);
//     res.json(updatedUser)
// }

exports.deleteUser = async ({ params: { id } }, res) => {
    await Users.destroy({ where: { id } });
    res.sendStatus(200)
}


exports.login = async ({ body: { username, password } }, res) => {
    const user = await Users.getLogin({ username, password })
    if (!user) {
        res.sendStatus(404); return;
    }
    res.json(user);

}
exports.createToken = async ({ body: { username, password, access_token, type } }, res) => {
    const user = await Users.findByToken({ username, password, access_token, type })
    if (!user) {
        res.sendStatus(404); return;
    }
    res.json(user);

}

// exports.createUser = async ({ body: { username, password, access_token, type } }, res) => {
//     const id = await Users.createAUser({ username, password, access_token, type });
//     res.json(id)
// }

// exports.updateUser = async ({ params: { id }, body: body }, res) => {
//     const updatedUser = await Users.update(body, id);
//     res.json(updatedUser)
// }

// exports.deleteUser = async ({ params: { id } }, res) => {
//     await Users.destroy(id);
//     res.sendStatus(200)
// }

