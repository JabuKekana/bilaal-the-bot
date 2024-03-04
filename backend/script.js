import express from 'express';
import cors from "cors";
import OpenAI from 'openai';
import readline from 'readline';
import { config } from 'dotenv';
config();

// Create an instance of the OpenAI class
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on('line', async (input) => {
  // Code for chat completion using openai
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": input}],
  });
  console.log(chatCompletion.choices[0].message);

  // Fetching available engines has been removed from v4 SDK, 
  // you'd need to make a direct API call if you wish to use this feature.

  userInterface.prompt();
});
