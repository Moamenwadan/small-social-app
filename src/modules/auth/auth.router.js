import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
import * as authValidation from "./auth.validation.js";
import validation from "../../middleware/validation.middleware.js";
const router = Router();

// signup
router.get("/", authController.signupFr);
router.post(
  "/",
  validation(authValidation.signup, "/auth"),
  authController.signup
);

// login
router.get("/login", authController.loginFr);
router.post(
  "/login",
  validation(authValidation.login, "/auth/login"),
  authController.login
);

// logout
router.post("/logout", authController.logout);

export default router;
