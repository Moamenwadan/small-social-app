import User from "../../../DB/models/user.model.js";
import cloudinary from "../../../utils/fileUploading/cloudinary.config.js";
export const profileFr = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });

  user.shareLink = `${req.protocol}://${req.headers.host}/user/${user._id}/shareProfile`;
  console.log(user.shareLink);
  return res.render("profile", {
    pageTitle: "profile",
    cssLink: "/shared/css/signup.css",
    emailErr: "the session is expired",
    user,
    message: req.flash("message")[0],
  });
};

export const profile = async (req, res, next) => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `Ejs/user/${req.user._id}/profile`,
    }
  );
  await User.updateOne(
    { _id: req.user._id },
    { image: { secure_url, public_id } }
  );

  return res.redirect("/user/profile");
};

export const shareProfile = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });

  user.shareLink = `${req.protocol}://${req.headers.host}/user/${user._id}/shareProfile`;

  return res.render("message", {
    pageTitle: "message",
    cssLink: "/shared/css/signup.css",
    // emailErr: "the session is expired",
    user,
  });
};
