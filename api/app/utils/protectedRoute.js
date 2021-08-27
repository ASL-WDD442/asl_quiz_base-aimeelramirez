const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
    const { token } = req.headers;
    //TODO remove userId
    console.log("TOKEN route===>", req.headers)
    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        res.userId = id;
        res.token = token;
        req.userId = id;
        req.userId = id;
        return next();
    } catch (e) {
        return res.status(401).json({ loggedIn: false });
    }
};

module.exports = protectedRoute;
