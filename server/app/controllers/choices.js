exports.renderChoices = async (req, res) => {
  const choices = await req.API.get(`/choices`);
  console.log(choices);
  res.render("choice/user", { choices });
};

exports.renderChoiceDetails = async (req, res) => {
  const { id } = req.params;
  const choice = await req.API.get(`/choices/${id}`);
  // let questionId;
  // choice.map((item) => {
  //   questionId = item.questionId;
  //   console.log(questionId);
  // })
  res.render("choice/detail", { choice });
};
exports.renderChoiceForm = async (req, res) => {
  const { questionId } = req.query;
  res.render("choice/form", { value: "", type: "private", questionId });
};

exports.renderChoiceFormWithErrors = (errors, req, res, next) => {
  const { questionId } = req.query;
  const { value, correct } = req.body;
  res.render("choice/form", {
    value,
    correct,
    questionId,
    errors,
  });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  console.log('edit form')
  const data = await req.API.get(`/choices/${id}`);
  let value, type, questionId;
  data.map((item) => {
    value = item.value;
    type = item.type;
    questionId = item.questionId;

  })
  const correct = type;
  console.log(data)
  res.render("choice/form", { id, value, correct, questionId });
};

exports.saveChoice = async (req, res) => {
  const { value, correct, questionId } = req.body;
  console.log('save')
  const type = correct;
  const { id } = req.params;
  if (id) {
    await req.API.put(`/choices/${id}`, { value, type, questionId });
  } else {
    await req.API.post("/choices", { value, type, questionId });
  }
  console.log({ value, type, questionId })

  res.redirect(`/admin/questions/${questionId}`);
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect("back");
};

exports.deleteChoice = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/choices/${id}`);
  res.redirect("/");
};
