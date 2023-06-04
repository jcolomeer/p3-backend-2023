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

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newFilm = await prismaClient.film.create({
      data: { ...req.body },
    });
    res.status(200).json({
      ...newFilm,
      created: true,
    });
  })
);

router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id: filmId } = req.params;
    const updatedFilm = await prismaClient.film.update({
      where: { id: filmId },
      data: { ...req.body },
    });
    res.status(200).json({
      ...updatedFilm,
      updated: true,
    });
  })
);

export default router;
