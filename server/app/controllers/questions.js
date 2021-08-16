
exports.renderQuestionsAll = async (req, res) => {
  const questions = await req.API.get(`/questions`);
  console.log(questions)
  res.render("question/user", { questions });
};

exports.renderQuestionDetails = async (req, res) => {
  const { id } = req.params;
  const question = await req.API.get(`/questions/${id}`);
  const choices = await req.API.get(`/choices?questionId=${id}`);

  console.log({ question, choices });
  res.render("question/detail", { question, choices });
};



exports.renderQuestionForm = async (req, res) => {

  const { id } = req.query;
  res.render("question/form", id);
};

exports.renderQuestionFormWithErrors = (errors, req, res, next) => {
  const { title, type } = req.body;

  res.render("question/form", { title, type, errors });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const questions = await req.API.get(`/questions/${id}`);
  let title, quizId;
  questions.map((item) => {
    title = item.title;
    quizId = item.quizId;
  })
  console.log("questions:", { id, title, quizId })

  res.render("question/form", { id, title, quizId });
};

exports.saveQuestion = async (req, res) => {
  console.log('Save')

  const question = req.body;
  const { id } = req.params;
  console.log("questions save:", question)

  if (id) {
    await req.API.put(`/questions/${id}`, question);
  } else {
    await req.API.post("/questions", question);
  }
  res.redirect(`/admin/quizzes/${question.quizId}`);
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect("back");
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/questions/${id}`);
  res.redirect("/");
};
