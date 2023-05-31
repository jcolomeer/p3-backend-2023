import { Router } from "express";
import prismaClient from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import reviewRouter from "./reviews.js";

const router = Router();

router.get(
  "/:id",
  errorChecked(async (req, res) => {})
);

export default router;
