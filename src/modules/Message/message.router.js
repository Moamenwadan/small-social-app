import { Router } from "express";
import * as messageController from "./controller/message.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import authorization from "../../middleware/authorization.middleware.js";
import { roles } from "../../DB/models/user.model.js";
import uploadCloud from "../../utils/fileUploading/multerCloud.js";
const router = Router();

// router.get("/:id/shareProfile", messageController.sendMessage);
router.post("/", isAuthenticated, messageController.sendMessage);
router.post("/delete/:id", isAuthenticated, messageController.deleteMessage);

export default router;
