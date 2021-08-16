exports.renderLanding = async (req, res) => {
    const auths = await req.API.get(`/auths`);
    res.render('landing', { auths });
};

exports.renderAuths = async (req, res) => {
    const auths = await req.API.get(`/auth`);
    console.log(auths)
    res.render('auth', auths);
};