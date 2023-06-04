import { Router } from "express";
import prismaClient from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router({ mergeParams: true });

router.get(
  "/",
  errorChecked(async (req, res) => {
    const { filmId, userId } = req.params;
    let reviews;
    if (filmId) {
      reviews = await prismaClient.review.findMany({
        where: { filmId: filmId },
      });
    } else if (userId) {
      reviews = await prismaClient.review.findMany({
        where: {
          userId: userId,
        },
      });
    }
    res.status(200).json(reviews);
  })
);

router.patch(
  "/:reviewId",
  errorChecked(async (req, res) => {
    const { userId, reviewId } = req.params;
    const updatedReview = await prismaClient.review.update({
      where: { id: reviewId },
      data: { ...req.body },
    });
    res.status(200).json({ ...updatedReview, updated: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const { filmId } = req.params;
    const { userId } = req.query;
    const newReview = await prismaClient.review.create({
      data: { ...req.body, userId, filmId },
    });
    res.status(200).json({ newReview, created: true });
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedReview = await prismaClient.review.delete({
      where: { id },
    });
    res.status(200).json({ ...deletedReview, deleted: true });
  })
);

export default router;
