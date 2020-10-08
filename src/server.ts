import { Db } from "mongodb";
import * as core from "express-serve-static-core";
import * as dotenv from "dotenv";
import * as express from "express";
import * as nunjucks from "nunjucks";
import * as platformsController from "./controllers/platforms.controller";
import * as gamesController from "./controllers/games.controller";
import initDb from "../utils/initDatabase";
import PlatformModel, { Platform } from "./models/platformModel";
import GameModel, { Game } from "./models/gameModel";

dotenv.config();

const app = express();

app.use("/assets", express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("views", __dirname + "/views");
app.set("view engine", "njk");

const clientWantsJson = (request: express.Request): boolean => request.get("accept") === "application/json";

async function makeApp(db: Db): Promise<core.Express> {
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

  // GET platforms/:slug
  // app.get("/platforms/:slug", async (request, response) => {
  //   const platform = await platformsController.findBySlug(db, request.params.slug);

  //   console.log(platform);

  // if (platform) {
  //   if (clientWantsJson(request)) {
  //     response.json(platform);
  //   } else {
  //     response.render("platform", { platform });
  //   }
  // } else {
  //   response.status(404);
  //   if (clientWantsJson(request)) {
  //     response.json({ error: "This platform does not exist." });
  //   } else {
  //     response.render("platform", { platform });
  //   }
  // }
  // });

  app.get("/*", (request, response) => {
    if (clientWantsJson(request)) {
      response.status(404).json({ error: "Not Found" });
    } else {
      response.status(404).render("not-found");
    }
  });

  return app;
}

initDb()
  .then(async (client) => {
    const app = await makeApp(client.db());

    app.listen(process.env.PORT, () => {
      console.log(`listen on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(console.error);