import express, { Router } from "express";
import { configuration } from "../config";
import { SmarthomeLogger } from "@smarthome/logger";
import { DeviceController } from "../controllers/device-controller";

export const createRouter = (
  config: configuration,
  logger: SmarthomeLogger,
  deviceController: DeviceController
) => {
  const router = express.Router();
  router.post("/", deviceController.add);
  router.get("/", deviceController.getAll);
  router.get("/:id", deviceController.get);
  router.patch("/:id", deviceController.update);
  router.put("/:id", deviceController.update);

  return router;
};
