import initDb from "../utils/initDatabase";

initDb().then(async (client) => {
  const db = client.db();

  const collections = await db.listCollections().toArray();
  const collectionsNames = collections.map((collection) => collection.name);

  if (collectionsNames.includes("platforms")) {
    await db.collection("platforms").drop();
    console.log("'platforms' collection dropped.drop");
  } else {
    console.log("No 'platforms' collection");
  }

  if (collectionsNames.includes("games")) {
    await db.collection("games").drop();
    console.log("'games' collections dropped.");
  } else {
    console.log("No 'games' collection");
  }

  client.close();
});
