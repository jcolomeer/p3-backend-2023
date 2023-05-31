import { Router } from "express";
import prismaClient from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import reviewsRouter from "./reviews.js";

const router = Router();

export default router;
