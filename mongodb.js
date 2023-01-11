import mongodb, { MongoClient } from "mongodb";
import dotenv from "dotenv";

const envConfig = dotenv.config();
const env = process.env;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = env.DB_NAME;

const client = new MongoClient(connectionURL);

async function main() {
  await client.connect();
  console.log("Connected successfully to db server");
  const db = client.db(databaseName);
  const collection = await db.collection("tasks");
  await collection
    .insertMany([
      { description: "throw trash", completed: false },
      { description: "read docs", completed: true },
      { description: "play base", completed: false },
    ])
    .then(console.log);
  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close);
