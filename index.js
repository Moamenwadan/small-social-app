import express from "express";
import { initApp } from "./src/app.router.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
/**
 * // await initApp(app, express);
 */
process.env.NODE_ENV === 'dev' ? 
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}) : console.log(`we are on vercel`)

