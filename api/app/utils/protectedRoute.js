const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
    const { token, userId } = req.headers;
    // const { userId } = req.body;
    console.log(userId)

    console.log("TOKEN route===>", req.headers)

    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        if (id === userId) return req.userId = id;
        req.token = token;
        return next();
    } catch (e) {
        return res.status(401).json({ loggedIn: false });
    }
};

module.exports = protectedRoute;
