import { currentUser, requireAuth } from "@sapienslabs/ticketing-common";
import express from "express";
const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  async (req, res) => {
    return res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
