import User from "../DB/models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.session?.user?._id) {
      req.flash("emailErr", "Expired session");
      return res.redirect("/auth/login");
    }
    const user = await User.findOne({ _id: req.session?.user?._id });
    if (!user) {
      req.flash("emailErr", "Not authorized account");
      return res.redirect("/auth/");
    }

    req.user = user;
    return next();
  } catch (error) {
    req.flash("emailErr", error);
  }
};
