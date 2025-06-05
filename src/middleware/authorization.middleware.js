import User from "../DB/models/user.model.js";

const authorization = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      req.flash(
        "emailErr",
        "you shouldn't access to this page beacause authorization "
      );
      return res.redirect("/auth/login");
    }

    return next();
  };
};
export default authorization;
