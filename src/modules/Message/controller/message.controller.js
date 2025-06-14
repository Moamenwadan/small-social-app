import User from "../../../DB/models/user.model.js";
import Message from "../../../DB/models/message.model.js";

export const sendMessage = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    return next(new Error("user is not Exist"));
  }

  const message = await Message.create({ content, receiver: id, sender: req.user._id });


  req.flash("messages", "the message is send successfully");

  return res.redirect(`/user/${id}/shareProfile`);
};

export const deleteMessage = async (req, res, next) => {
  const { id } = req.params; // message id

  const message = await Message.findOneAndDelete({ _id: id, receiver: req.user._id });
  if (!message) {
    return next(new Error("message not found or you are not authorized to delete this message"));
  }

  return res.redirect("/user/profile");
};
