exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('landing', { quizzes });
};

exports.renderQuiz = async (req, res) => {
  const { id } = req.params;
  let quiz = await req.API.get(`/quizzes/${id}`);
  console.log(await req.API.get(`/quizzes/${id}`));
  res.render('quiz/index', { quiz });
};

exports.renderQuizDetail = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const { name, type } = await req.API.get(`/quizzes/${id}`);
  const questions = await req.API.get(`/questions?quizId=${id}`);
  res.render('quiz/index', { name, type, questions });
};

exports.renderMyQuizzes = async (req, res) => {
  const { userId } = req.query;
  const quizzes = await req.API.get(`/quizzes?userId=${userId}`);
  console.log(await req.API.get(`/quizzes?userId=${userId}`));
  res.render('quiz/user', { quizzes });
};

exports.renderQuizForm = async (req, res) => {
  res.render('quiz/form', { id: '', name: '', type: 'private' });
};


exports.goBackOnError = (errors, req, res, next) => {
  res.redirect('back');
};

