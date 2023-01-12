import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";


const envConfig = dotenv.config();
const env = process.env;

const connectionURL = env.MONGODB_URL;
const databaseName = env.DB_NAME;

const client = new MongoClient(connectionURL, { useNewUrlParser: true });

async function main() {
  await client.connect();
  console.log("Connected to database");

  const db = client.db(databaseName);

  const userCollection = db.collection("tasks");

  await userCollection.deleteOne({ description: "throw trash" }).then(console.log);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
 // .finally(() => client.close);
