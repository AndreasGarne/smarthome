import { SmarthomeLogger } from "@smarthome/logger";
import { configuration } from "../config";
import { NextFunction, Request, Response } from "express";
import { Document, Model } from "mongoose";

export interface StorageController {
  create(
    model: Model<any>,
    populate?: string[]
  ): (req: Request, res: Response, next: NextFunction) => void;
  get(
    model: Model<any>,
    populate?: string[]
  ): (req: Request, res: Response, next: NextFunction) => void;
  getAll(
    model: Model<any>,
    populate?: string[]
  ): (req: Request, res: Response, next: NextFunction) => void;
  update(
    model: Model<any>,
    populate?: string[]
  ): (req: Request, res: Response, next: NextFunction) => void;
  updateDiscriminator(
    model: Model<any>,
    populate?: string[]
  ): (req: Request, res: Response, next: NextFunction) => void;
}

export const createStorageController = (
  config: configuration,
  logger: SmarthomeLogger
): StorageController => {
  const create =
    (model: Model<any>, populate?: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      logger.log("debug", `Creating document in ${model.modelName}`);
      const document = new model(req.body);
      document
        .save()
        .then((result: Document) => {
          res.status(201).send(result.toObject({ getters: true }));
        })
        .catch((error: any) => {
          logger.log(
            "error",
            `Failed to create document in ${model.modelName}`
          );
          logger.log("error", `Error: ${error}`);
          res.status(500).json({ error });
        });
    };
  const getAll =
    (model: Model<any>, populate?: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      logger.log("debug", `Getting all documents from ${model.modelName}`);
      model
        .find<Document>()
        .populate(populate || [])
        .then((results) => {
          res.status(200).json(
            results.map((result) => ({
              ...result.toObject({ getters: true }),
            }))
          );
        })
        .catch((error) => {
          logger.log(
            "error",
            `Failed to get all documents from ${model.modelName}`
          );
          logger.log("error", `Error: ${error}`);
          res.status(500).json({ error });
        });
    };

  const get =
    (model: Model<any>, populate?: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const idParam = <string>req.query.type ?? '_id';
      logger.log(
        "debug",
        `Getting document from ${model.modelName} by ${idParam}: ${id}`
      );
      // logger.log("debug", req.params.id);
      model
        .findOne<Document>({ [idParam]: id.toLowerCase() })
        .populate(populate || [])
        .then((result) => {
          if (!result) {
            return res.status(404).json({ message: "Not found" });
          }
          res.status(200).send(result.toObject({ getters: true }));
        })
        .catch((error) => {
          logger.log(
            "error",
            `Failed to get document from ${model.modelName} by id: ${id}`
          );
          logger.log("error", `Error: ${error}`);
          res.status(500).json({ error });
        });
    };

  const update =
    (model: Model<any>, populate?: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      logger.log(
        "debug",
        `Updating document from ${model.modelName} by id: ${id}`
      );
      let errorLogMessage = "Failed to get document";
      console.log(req.body);
      model
        .findOneAndUpdate<Document>({ _id: id }, req.body, { new: true })
        .populate(populate || [])
        .then((result) => {
          if (!result) {
            return res.status(404).json({ message: "Not found" });
          }
          res.status(200).send(result.toObject({ getters: true }));
        })
        .catch((error) => {
          logger.log(
            "error",
            `${errorLogMessage} from ${model.modelName} by id: ${id}`
          );
          logger.log("error", `Error: ${error}`);
          res.status(500).json({ error });
        });
    };

  const updateDiscriminator =
    (model: Model<any>, populate?: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      logger.log(
        "debug",
        `Updating document discriminator from ${model.modelName} by id: ${id}`
      );
      let errorLogMessage = "Failed to get document";
      console.log(req.body);
      model
        .findOneAndUpdate<Document>(
          { _id: id },
          { __t: req.body.DeviceType },
          { new: true, overwriteDiscriminatorKey: true }
        )
        .populate(populate || [])
        .then((result) => {
          if (!result) {
            return res.status(404).json({ message: "Not found" });
          }
          res.status(200).send(result.toObject({ getters: true }));
        })
        .catch((error) => {
          logger.log(
            "error",
            `${errorLogMessage} from ${model.modelName} by id: ${id}`
          );
          logger.log("error", `Error: ${error}`);
          res.status(500).json({ error });
        });
    };

  return {
    create,
    getAll,
    get,
    update,
    updateDiscriminator,
  };
};
