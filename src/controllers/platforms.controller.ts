import * as express from "express";
import PlatformModel from "../models/platformModel";

const clientWantsJson = (request: express.Request): boolean => request.get("accept") === "application/json";

export function index(platformModel: PlatformModel) {
  return async (request: express.Request, response: express.Response): Promise<void> => {
    const platforms = await platformModel.findAll();
    if (clientWantsJson(request)) {
      response.json(platforms);
    } else {
      response.render("platforms", { platforms });
    }
  };
}

export function show(platformModel: PlatformModel) {
  return async (request: express.Request, response: express.Response): Promise<void> => {
    const platform = await platformModel.findBySlug(request.params.slug);
    if (platform) {
      if (clientWantsJson(request)) {
        response.json(platform);
      } else {
        response.render("platform", { platform });
      }
    } else {
      response.status(404);
      if (clientWantsJson(request)) {
        response.json({ error: "This platform does not exist." });
      } else {
        response.render("platform", { platform });
      }
    }
  };
}
