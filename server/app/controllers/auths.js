

const querystring = require('querystring');
const log = require('debug')('web:request');

exports.renderLogin = (req, res) => {
  res.render('auth/login');
};
exports.renderSignup = (req, res) => {
  res.render('auth/signup');
};

exports.verifySignup = async (req, res) => {
  const { token, loggedIn } = await req.API.post('/auth/signup', req.body);
  req.session.loggedIn = loggedIn;
  req.session.token = token;
  res.redirect('/admin/quizzes/list');
};

exports.renderLogin = (req, res) => {
  console.log('getting  rendered login ')

  res.render('auth/login');
};

exports.verifySignup = async (req, res) => {
  const { token, loggedIn } = await req.API.post('/auth/signup', req.body);
  req.session.loggedIn = loggedIn;
  req.session.token = token;
  res.redirect('/admin/quizzes/list');
};

exports.renderLogin = (req, res) => {
  res.render('auth/login');
};

exports.redirectToGoogle = (req, res) => {
  const GOOGLE_URL = 'https://accounts.google.com/o/oauth2/v2/auth?';
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
  });
  log(GOOGLE_URL + params);
  res.redirect(GOOGLE_URL + params);
};

exports.verifyGoogleCode = async (req, res) => {
  const { code } = req.query;
  const { token, loggedIn } = await req.API.post('/auth/google', { code, url: process.env.CALLBACK_URL });
  req.session.loggedIn = loggedIn;
  req.session.token = token;
  res.redirect('/admin/quizzes/list');
};

exports.login = async (req, res) => {
  const apiResponse = await req.API.post('/auth/login', req.body);
  if (!apiResponse.error) {
    req.session.loggedIn = apiResponse.loggedIn;
    req.session.token = apiResponse.token;
    res.redirect('/admin/quizzes/list');
  } else {
    res.render('auth/login', { errors: [{ msg: apiResponse.error }] });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.renderAuths = async (req, res) => {
  const auths = await req.API.get(`/auth`);
  console.log("auth: ", { auths });
  // res.render("auth/user", { username, id });
  return res.render("auth/user", { auths });
};

exports.renderAuth = async (req, res) => {
  const { id } = req.params;
  console.log("auth ===> ", id)
  const auth = await req.API.get(`/auth/${id}`);
  let username;
  username = auth['username'];
  console.log({ auth, id });
  res.render("auth/detail", { id, username });
};

exports.renderAuthFormWithErrors = (errors, req, res, next) => {
  const { id } = req.query;
  const { username } = req.body;
  res.render("auth/form", {
    username,
    id,
    errors,
  });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  console.log('edit form')
  const data = await req.API.get(`/auth/${id}`);
  let username;
  username = data['username'];
  // data.map((item) => {
  //   username = item.username;
  // })
  console.log(data)
  res.render("auth/form", { id, username });
};

exports.saveAuth = async (req, res) => {
  const { username } = req.body;
  console.log('save:=>', username)

  const { id } = req.params;
  if (id) {
    await req.API.put(`/auth/${id}`, { username });
  } else {
    await req.API.post("/auth", { username });
  }

  res.redirect(`/admin/auth/${id}`);
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect("back");
};
