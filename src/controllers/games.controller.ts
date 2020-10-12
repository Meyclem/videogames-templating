import * as express from "express";
import GameModel from "../models/gameModel";

export function index(gameModel: GameModel) {
  return async (_request: express.Request, response: express.Response): Promise<void> => {
    const games = await gameModel.findAll();
    response.json(games);
  };
}

export function show(gameModel: GameModel) {
  return async (request: express.Request, response: express.Response): Promise<void> => {
    const game = await gameModel.findBySlug(request.params.slug);
    if (game) {
      response.json(game);
    } else {
      response.status(404);
      response.json({ error: "This game does not exist." });
    }
  };
}
