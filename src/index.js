import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.listen(() => console.log("Server is up on port: " + port))