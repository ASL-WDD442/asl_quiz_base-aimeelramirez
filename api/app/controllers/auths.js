const axios = require('axios');
const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { Users } = require('../models')



exports.exchangeCode = async (req, res) => {
    const { code, url } = req.body;
    try {
        const { data } = await axios.post('https://oauth2.googleapis.com/token', null, {
            params: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: url,
            },
        });
        const userData = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
            headers: {
                authorization: `Bearer ${data.access_token}`,
            },
        });
        const [user] = await Users.upsert({
            access_token: data.access_token,
            username: userData.data.email,
            name: userData.data.name,
            type: 'type1',
        });
        const token = jwt.sign({ id: user.id }, process.env.SECRET);
        let id = user.id;
        res.json({ id, token, loggedIn: true });
    } catch (e) {
        error(e);
        res.status(401).json({ loggedIn: false });
    }
};

exports.registerUser = async (req, res) => {
    await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        let values = {
            username: req.body.email,
            name: req.body.name,
            password: hash,
            type: 'type2'
        }
        const [user] = await Users.upsert(values);
        let userId = user.id;
        const token = jwt.sign({ id: userId }, process.env.SECRET);
        return res.json({ userId, token, loggedIn: true });
    });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const [user] = await Users.findAll({ where: { username: email } });
    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user.id }, process.env.SECRET);
                console.log("SIGNING IN api", result)

                return res.json({ token, loggedIn: true, user });
            } else {
                res.json({ loggedIn: false, error: 'Invalid credentials!' });
            }
        });

    } else {
        res.json({ loggedIn: false, error: 'No user found!' });
    }
};



exports.getAll = async (req, res) => {
    let users = await Users.findAll();
    if (users) {
        console.log('users==> ', users)
        res.json(users)
    }
    else {
        res.json({ loggedIn: false, error: 'No user found!' });
    }

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
    const { username, password, name } = req.body;
    try {
        const newChoice = await Users.createAUser({ name, username, password, access_token, type })
        res.json({ id: newChoice });
    } catch (e) {
        const errors = e.errors.map((err) => err.message);
        res.sendStatus(400).json({ errors });
    }
};


exports.deleteUser = async ({ params: { id } }, res) => {
    await Users.destroy({ where: { id } });
    res.sendStatus(200)
}



exports.createToken = async ({ body: { username, password, access_token, type } }, res) => {
    const user = await Users.findByToken({ username, password, access_token, type })
    if (!user) {
        res.sendStatus(404); return;
    }
    res.json(user);

}

