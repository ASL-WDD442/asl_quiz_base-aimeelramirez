const express = require("express");
const path = require("path");
const error = require("debug")("server:error");
// running app
const app = express();
app.use(express.static(path.join(__dirname, "/public")));
const API = require("./utils/api");
const publicRoutes = require("./routes/public");
const quizRoutes = require("./routes/quizzes");
const questionRoutes = require("./routes/questions");
const choiceRoutes = require("./routes/choices");
const authRoutes = require("./routes/auths");

// const authDecisionsRoutes = require('./routes/authDecisions');
app.use(express.static("public"));
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

// app.use(express.static(path.join(__dirname, 'public/styles')));

app.use("/static", express.static(path.resolve("public")));

app.use(express.urlencoded({ extended: true }));
//apply api
app.use(API);
//engine
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
//get routes
app.use("/", publicRoutes);
// app.use('/quiz', publicRoutes);
app.use("/quiz", quizRoutes);
app.use("/admin/auth", authRoutes);
app.use("/admin/quizzes", quizRoutes);
app.use("/admin/questions", questionRoutes);
app.use("/admin/choices", choiceRoutes);
// app.use(express.json());

//eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    error("error found: ", err);
    res.sendStatus(500);
});
module.exports = app;
