import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();
// console.log(process.env.CLOUD_NAME);
cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.API_KEY,
  // api_secret: process.env.API_SECRET,
  cloud_name: "dr4po5j8x",
  api_key: "671723232855865",
  api_secret: "LDl2Y6ptAgv888Ag4S7w49kQOv8",
});
export default cloudinary;
