import { Router } from "express";
import prismaClient from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import reviewsRouter from "./reviews.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const users = await prismaClient.user.findMany({});
    res.status(200).json(users);
  })
);

router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id: userId } = req.params;
    const user = await prismaClient.user.findUniqueOrThrow({
      where: { id: userId },
    });
    res.status(200).json(user);
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newUser = await prismaClient.user.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ ...newUser, created: true });
  })
);

router.patch(
  "/:id",
  errorChecked(async (req, res) => {
    const { id: userId } = req.params;
    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ ...updatedUser, updated: true });
  })
);

router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id: userId } = req.params;
    const deletedUser = await prismaClient.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ ...deletedUser, deleted: true });
  })
);

router.use("/:userId/reviews", reviewsRouter);

export default router;
