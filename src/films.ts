import { Router } from "express";
import prismaClient from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import reviewRouter from "./reviews.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const films = await prismaClient.film.findMany({});
    res.status(200).json(films);
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const film = await prismaClient.film.findUniqueOrThrow({
      where: { id: id },
    });
    res.status(200).json(film);
  })
);

export default router;
