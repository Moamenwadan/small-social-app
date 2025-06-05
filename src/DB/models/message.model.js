import { model, Schema, Types } from "mongoose";
// const messagesSchema = new Schema(
//   {
//     content: { type: String, required: true, minlength: 5 },
//     userId: { type: Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

const messagesSchema = new Schema(
  {
    content: { type: String, required: true, minlength: 5 },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    receiver: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Message = model("Message", messagesSchema);
export default Message;
