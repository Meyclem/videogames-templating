import { Db } from "mongodb";
import * as core from "express-serve-static-core";
import * as dotenv from "dotenv";
import * as express from "express";
import * as gamesController from "./controllers/games.controller";
import * as platformsController from "./controllers/platforms.controller";
import GameModel, { Game } from "./models/gameModel";
import initDb from "../utils/initDatabase";
import PlatformModel, { Platform } from "./models/platformModel";

dotenv.config();

const app = express();

function makeApp(db: Db): core.Express {
  const platformModel = new PlatformModel(db.collection<Platform>("platforms"));
  const gameModel = new GameModel(db.collection<Game>("games"));

  // GET platforms
  app.get("/platforms", platformsController.index(platformModel));
  // GET platforms/:slug
  app.get("/platforms/:slug", platformsController.show(platformModel));

  // GET games
  app.get("/games", gamesController.index(gameModel));
  // GET platforms/:slug
  app.get("/games/:slug", gamesController.show(gameModel));

  app.get("/*", (_request, response) => {
    response.status(404).json({ error: "Not Found" });
  });

  return app;
}

initDb()
  .then(async (client) => {
    const app = makeApp(client.db());

    app.listen(process.env.PORT, () => {
      console.log(`listen on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(console.error);
