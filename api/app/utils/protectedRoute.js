const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
    let { token } = req.headers;
    // console.log("TOKEN route===>", req.headers)
    try {
        token = req.header("Authorization").replace("Bearer ", "")
        const { id } = jwt.verify(token, process.env.SECRET);
        req.userId = id;
        return next();
    } catch (e) {
        return res.status(401).json({ loggedIn: false });
    }
};

module.exports = protectedRoute;
