import { Router } from "express";
import * as userController from "./controller/user.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import authorization from "../../middleware/authorization.middleware.js";
import { roles } from "../../DB/models/user.model.js";
import uploadCloud from "../../utils/fileUploading/multerCloud.js";
const router = Router();

// signup
router.get(
  "/profile",
  isAuthenticated,
  authorization(roles.user),
  userController.profileFr
);
router.post(
  "/profile",
  isAuthenticated,
  authorization(roles.user),
  uploadCloud().single("image"),
  userController.profile
);
router.get("/:id/shareProfile", userController.shareProfile);

// router.post("/", authController.signup);

// login

export default router;
