import { Router } from "express";
import { CloudflareController } from "../controllers/cloudflare.controller";
import { cloudflareProvisionService } from "../di/cloudflare.cotainer"; // 👈 добавить
import { errorHandler } from "../utils/handlers/error.handler";

const router = Router();

const controller = new CloudflareController();

router.post("/provision", async (req, res, next) => {
  try {
    await controller.provisionDomain(req, res);
  } catch (err) {
    next(err);
  }
});

router.use(errorHandler);

export default router;