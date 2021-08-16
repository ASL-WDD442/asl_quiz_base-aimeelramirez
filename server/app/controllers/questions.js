exports.renderQuestionDetails = async (req, res) => {
  const { id } = req.params;

  const question = await req.API.get(`/questions/${id}`);
  const choices = await req.API.get(`/choices?questionId=${id}`);

  console.log({ question, choices })
  res.render('question/detail', { question, choices });
};

exports.renderQuestions = async (req, res) => {
  const questions = await req.API.get(`/questions`);
  console.log(questions)
  res.render('question/user', { questions });
};

exports.renderQuestionForm = async (req, res) => {
  const { quizId } = req.query;
  res.render('question/form', { title: '', type: 'private', quizId });
};

exports.renderQuestionFormWithErrors = (errors, req, res, next) => {
  const { title, type } = req.body;
  res.render('question/form', { title, type, errors });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const question = await req.API.get(`/questions/${id}`);
  res.render('question/form', question);
};

exports.saveQuestion = async (req, res) => {
  const question = req.body;
  const { id } = req.params;
  if (id) {
    await req.API.put(`/questions/${id}`, question);
  } else {
    await req.API.post('/questions', question);
  }
  res.redirect(`/admin/quizzes/${question.quizId}`);
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect('back');
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  await req.API.delete(`/questions/${id}`);
  res.redirect('/');
};
