import express, { Router } from "express";
import { configuration } from "../config";
import { SmarthomeLogger } from "@smarthome/logger";
import { StorageController } from "../controllers/storage-controller";
import { Model } from "mongoose";

export const createRouter = (
  config: configuration,
  logger: SmarthomeLogger,
  storageController: StorageController
) => {
  const addRoutes = (model: Model<any>): Router => {
    const router = express.Router();
    logger.log("info", `Creating routes for ${model.modelName}`);
    router.post("/", storageController.create(model, ["Commands"]));
    router.get("/", storageController.getAll(model, ["Commands"]));
    router.get("/:id", storageController.get(model, ["Commands"]));
    router.patch("/:id", storageController.update(model, ["Commands"]));
    router.put("/:id", storageController.updateDiscriminator(model, ["Commands"]));
    return router;
  };
  return {
    addRoutes
  };
};
