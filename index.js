import express from "express";
import { initApp } from "./src/app.router.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 5000;
await initApp(app, express);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
