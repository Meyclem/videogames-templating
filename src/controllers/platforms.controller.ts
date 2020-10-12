import * as express from "express";
import PlatformModel from "../models/platformModel";

export function index(platformModel: PlatformModel) {
  return async (request: express.Request, response: express.Response): Promise<void> => {
    const platforms = await platformModel.findAll();
    response.json(platforms);
  };
}

export function show(platformModel: PlatformModel) {
  return async (request: express.Request, response: express.Response): Promise<void> => {
    const platform = await platformModel.findBySlug(request.params.slug);
    if (platform) {
      response.json(platform);
    } else {
      response.status(404);
      response.json({ error: "This platform does not exist." });
    }
  };
}
