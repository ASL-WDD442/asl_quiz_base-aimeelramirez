
exports.renderAuths = async (req, res) => {
  const auths = await req.API.get(`/auth`);
  console.log({ auths });
  return res.render("auth/user", { auths });
};

exports.renderAuth = async (req, res) => {
  const { id } = req.params;
  const auth = await req.API.get(`/auth/${id}`);
  console.log({ auth });
  res.render("auth/detail", { auth });
};
// exports.renderAuthForm = async (req, res) => {
//   const { id } = req.query;
//   res.render("auth/form", { username: "", id });
// };

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
  data.map((item) => {
    username = item.username;
  })
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
