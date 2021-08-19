
exports.renderQuestionsAll = async (req, res) => {
  const questions = await req.API.get(`/questions`);
  console.log(questions)
  res.render("question/user", { questions });
};

exports.renderQuestionDetails = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const question = await req.API.get(`/questions/${id}`);
  console.log("questions===> ", { question });


  const choices = await req.API.get(`/choices?questionId=${id}`);
  let title = question['title'];
  let quizId = question['quizId'];
  res.render("question/detail", { id, title, quizId, choices });
};



exports.renderQuestionForm = async (req, res) => {
  const { id, title, quizId } = req.query;
  res.render("question/form", { id, title, quizId });
};

exports.renderQuestionFormWithErrors = (errors, req, res, next) => {
  const { title, quizId } = req.body;
  res.render("question/form", { title, quizId, errors });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const questions = await req.API.get(`/questions/${id}`);
  let title, quizId;
  title = questions['title'];
  quizId = questions['quizId'];
  // questions.map((item) => {
  //   title = item.title;
  //   quizId = item.quizId;
  // })
  console.log('edit ques form', id, quizId, title)

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
  res.redirect(`/admin/questions/list`);

};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect("back");
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/questions/${id}`);
  res.redirect("/");
};
