import User from "../../../DB/models/user.model.js";
import { hash, compareHash } from "../../../utils/hashing/hash.js";
import { encrypt } from "../../../utils/encryption/encryption.js";
import { generateToken } from "../../../utils/token/token.js";
import sendEmail from "../../../utils/emails/sendEmail.js";
import { generateHTML } from "../../../utils/emails/generateHTML.js";

export const signupFr = async (req, res) => {
  // console.log(req.flash("validationErr"));
  res.render("signup", {
    pageTitle: "Signup",
    cssLink: "/shared/css/signup.css",
    emailErr: req.flash("emailErr")[0],
    oldData: req.flash("oldData")[0] || {},
    validationErr: req.flash("validationErr")[0] || [],
  });
};
export const signup = async (req, res, next) => {
  const { userName, email, password, confirmPassword, phone } = req.body;

  if (password != confirmPassword) {
    // return res.render("signup", {
    //   pageTitle: "Signup",
    //   cssLink: "/shared/css/signup.css",
    //   emailErr: req.flash("emailErr")[0],
    //   oldData: req.flash("oldData")[0] || {},
    //   // validationErr: req.flash("validationErr"),
    // });
    return next(new Error("the user already exist"));
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    // return next(new Error("the email is already exist", 404));
    // return res.render("signup", {
    //   pageTitle: "Signup",
    //   cssLink: "./shared/css/signup.css",
    //   emailErr: true,
    //   oldData: req.body,
    // });
    req.flash("emailErr", "the user doesn't exist");
    req.flash("oldData", req.body);
    return res.redirect("/auth/");
  }

  const hashPassword = hash({ plainText: password });
  const encryptionPhone = encrypt({ plainText: phone });

  const accessToken = generateToken({
    payload: { email },
    options: { expiresIn: 60 * 5 },
  });
  const refreshToken = generateToken({
    payload: { email },
    options: { expiresIn: 60 * 60 * 24 * 30 },
  });

  // const link = `http://localhost:5000/auth/confirmEmail/${accessToken}`;
  // const rfLink = `http://localhost:5000/auth/confirmEmail/${refreshToken}`;

  // await sendEmail({ to: email, subject: "signup", html: generateHTML(link) });

  const user = await User.create({
    userName,
    email,
    password: hashPassword,
    phone: encryptionPhone,
  });

  res.redirect("/auth/login");

  // res.render("Login", {
  //   pageTitle: "Login",
  //   cssLink: "./shared/css/signup.css",
  // });
};

export const loginFr = async (req, res) => {
  return res.render("Login", {
    pageTitle: "Login",
    cssLink: "/shared/css/signup.css",
    emailErr: req.flash("emailErr")[0],
    oldData: req.flash("oldData")[0],
    validationErr: req.flash("validationErr")[0] || undefined,
    endSession: req.session.destroy(),
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.render("login", {
      pageTitle: "Login",
      cssLink: "/shared/css/signup.css",
      emailErr: "the user doesn't exist",
      oldData: req.body,
      validationErr: req.flash("validationErr")[0] || undefined,
    });
  }

  if (!compareHash({ plainText: password, hashValue: user.password })) {
    return res.render("login", {
      pageTitle: "Login",
      cssLink: "/shared/css/signup.css",
      emailErr: "the password is fault",
      oldData: req.body,
    });
  }

  req.session.user = { _id: user._id, role: user.role };
  user.save();
  return res.redirect("/user/profile");
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.redirect("/user/profile");
    }
    res.redirect("/auth/login");
  });
};
