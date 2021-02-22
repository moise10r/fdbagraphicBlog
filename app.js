const express = require("express");
const app = express();
const dotenv = require("dotenv");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const csrf = require("csurf");
const multer = require("multer");
const helmet = require("helmet");
const compression = require("compression");
const Joi = require("joi");
Joi.object = require("joi-objectid")(Joi);

const crypto = require("crypto");

let value = crypto.randomBytes(64).toString("hex");

// const star = "* ";
// //where length is no of stars in longest streak
// const length = 4;
// let k = 0;
// for (let i = 1; i <= length * 2 - 1; i++) {
//   const k = i <= length ? i : length * 2 - i;
//   console.log(star.repeat(k));
// }

// console.log(value);

// const UserRouter = require("./routes/UserRoutes");
const routes = require("./routes/route");

const csrfProtection = csrf();

//load config
dotenv.config({ path: "./config/config.env" });

//connect mongoDB
const connectDB = require("./config/db");
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//middlewares
// public foder
app.use(express.static(path.join(__dirname, "client")));
//connect-flash
app.use(flash());
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session
// app.use(
//   session({
//     secret: process.env.SECRET,
//     key: process.env.KEY,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// );

//helmet
app.use(helmet());
app.use(compression());
app.use(flash());

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       if (!user) {
//         return next();
//       }
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       next(new Error(err));
//     });
// });

// app.use("/", UserRouter);
app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(
    `The server is runnig in ${
      process.env.NODE_ENV
    }, on port: ${chalk.bgGreenBright(PORT)}`
  );
});
