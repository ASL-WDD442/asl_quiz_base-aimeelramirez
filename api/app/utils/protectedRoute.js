const jwt = require('jsonwebtoken');

const protectedRoute = (req, res, next) => {
    let { token } = req.headers;
    token = req.header("Authorization").replace("Bearer ", "")
    // console.log("TOKEN route===>", req.headers)
    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        req.userId = id;
        return next();
    } catch (e) {
        return res.status(401).json({ loggedIn: false });
    }
};

module.exports = protectedRoute;
