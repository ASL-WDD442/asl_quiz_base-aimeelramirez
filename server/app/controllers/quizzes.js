exports.renderLanding = async (req, res) => {
  const quizzes = await req.API.get('/quizzes/public');
  res.render('landing', { quizzes });
};

exports.renderQuiz = async (req, res) => {
  const { id } = req.params;
  const quiz = await req.API.get(`/quizzes/${id}`);
  console.log(quiz);
  res.render('quiz/detail', { quiz });
};

exports.renderQuizDetail = async (req, res) => {
  let { id } = req.params;
  console.log(id)
  const data = await req.API.get(`/quizzes/${id}`);
  if (id) {

    console.log("data: ===> ", data)
    let name, type, quizId;

    name = data['name']
    type = data['type']
    quizId = data['id']

    // data.map((item) => {
    //   name = item.name;
    //   type = item.type;
    //   quizId = item.id;
    // })
    const questions = await req.API.get(`/questions?quizId=${id}`);
    console.log({ name, type, quizId, questions })
    // console.log(questions)

    res.render('quiz/detail', { name, type, quizId, questions });

  }
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

exports.saveQuiz = async (req, res) => {
  const { name, type } = req.body;
  const { id } = req.params;
  if (id) {
    await req.API.put(`/quizzes/${id}`, { name, type });
  } else {
    await req.API.post('/quizzes', { name, type });
  }
  res.redirect('/admin/quizzes/list');
};


exports.deleteQuiz = async (req, res) => {
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
  const data = await req.API.get(`/quizzes/${id}`);
  let name, type;

  name = data['name'];
  type = data['type'];
  // data.map((item) => {
  //   name = item.name;
  //   type = item.type;
  // })
  console.log("render edits: ", data)
  res.render('quiz/form', { id, name, type });
};