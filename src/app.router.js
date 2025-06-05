import connectDB from "./DB/connection.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRouter from "./modules/auth/auth.router.js";
import session from "express-session";
import flash from "connect-flash";
import mongoDBStore from "connect-mongodb-session";
import userRouter from "./modules/User/user.router.js";
import messageRouter from "./modules/Message/message.router.js";
const MongoDBStore = mongoDBStore(session);
// import { extend } from "joi";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const initApp = async (app, express) => {
  await connectDB();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "./views"));
  app.use("/shared", express.static(path.join(__dirname, "./views/shared")));
  let store = new MongoDBStore({
    uri: process.env.CONNECTION_URI,
    collection: "sessions",
  });
  store.on("error", function (error) {
    console.log(error);
  });
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store,
    })
  );
  app.use(flash());
  app.get("/", (req, res) => {
    res.redirect("/auth");
  });
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);
  app.get("/", (req, res) => {
    // res.send("Hello World");
    res.render("signup", {
      pageTitle: "Signup",
      cssLink: "./shared/css/signup.css",
    });
  });
};
