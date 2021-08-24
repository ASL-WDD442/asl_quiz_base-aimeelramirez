const log = require('debug')('server:log');

let userIdStore = '';
exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  log("get quizzes:", quizzes)
  res.render('landing', { quizzes });
};
exports.renderPublic = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  log("get quizzes pub:", quizzes)
  res.render('quiz/user', { quizzes });
};
// exports.renderMyQuizzes = async (req, res) => {
//   log(req.session)
//   let userId = req.session.userId;
//   const quizzes = await req.API.get(`/quizzes?userId=${userId}`);
//   res.render('quiz/user', { quizzes });
// };
exports.renderMyQuizzes = async (req, res) => {
  const { userId } = req.query;
  console.log(userIdStore);
  // log(req)
  const quizzes = await req.API.get(`/quizzes?userId=${userId}`);
  res.render('quiz/user', { quizzes });
};


exports.renderQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await req.API.get(`/quizzes/${id}`);
  console.log(quiz);
  res.render('quiz/detail', { quiz });
};

exports.renderQuizDetail = async (req, res) => {
  let { id } = req.params;
  const data = await req.API.get(`/quizzes/${id}`);
  // console.log(data)

  if (id) {
    // console.log("data: ===> ", data)
    let name, type, quizId, userId;
    name = data['name']
    type = data['type']
    quizId = data['id']
    userId = data['userId']
    // data.map((item) => {
    //   name = item.name;
    //   type = item.type;
    //   quizId = item.id;
    // })
    const questions = await req.API.get(`/questions?quizId=${id}`);
    console.log("Details:", { name, type, quizId, questions, userId })
    if (questions) {
      console.log('questions exists, please delete. if to delete quizzes');
    }
    res.render('quiz/detail', { name, type, quizId, questions, userId });

  }
};


exports.renderQuizForm = async (req, res) => {
  res.render('quiz/form', { id: '', name: '', type: 'private' });
};

exports.goBackOnError = (errors, req, res, next) => {
  res.redirect('back');
};

exports.saveQuiz = async (req, res) => {
  const { name, type, userId } = req.body;
  const { id } = req.params;
  let user = req.session.userId;
  console.log(user)
  let token = req.session.token;
  log('save >>: ', { name, type, token, userId });

  if (id) {
    await req.API.put(`/quizzes/${id}`, { name, type, token, userId });
  } else {
    await req.API.post('/quizzes', { name, type, token, userId });
  }
  res.redirect('/admin/quizzes/list');
};


exports.deleteQuiz = async (req, res, next) => {
  const { id } = req.params;

  await req.API.delete(`/quizzes/${id}`);
  res.redirect('/admin/quizzes/list');
};
exports.renderQuizFormWithErrors = (errors, req, res, next) => {
  const { name, type } = req.body;
  res.render('quiz/form', { name, type, errors });
};

exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  let token = req.session.token;
  let userId = req.session.userId;
  // log('server token??? ', req.userId);
  const data = await req.API.get(`/quizzes/${id}`);
  let name, type;

  name = data['name'];
  type = data['type'];
  if (token) {
    userId = data['id'];
  }
  else {
    userId = data['userId'];

  }
  userIdStore = userId;
  console.log("render edits: ", data)
  res.render('quiz/form', { id, name, type, token, userId });
};