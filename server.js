import * as dotenv from "dotenv";
// access env variables
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
  const { prompt } = req.body;

  const aiResponse = await openai.images.generate({
    prompt,
    n: 1,
    size: "1024x1024",
  });

  const image = aiResponse.data[0].url;
  res.send({ image });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
