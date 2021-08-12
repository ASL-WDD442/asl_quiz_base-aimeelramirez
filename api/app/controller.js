
const { Users } = require('./../models')

exports.getAll = (req, res) => {
    const { id } = req.query
    const users = Users.getAll(id)
    res.json(users)
    console.log('getting controllers on users all.')
}
