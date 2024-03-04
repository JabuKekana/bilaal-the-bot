import OpenAI from "openai";
import express from "express";
import { config } from "dotenv";
import fs from "fs";
import cors from "cors";
config();

const app = express();
const port = 7070;

// OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors()); // Cors middleware to allow all origins

app.post("/chat", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You're chatting with Bilaal the bot, a representative Qurtuba Online Academy."
        },
        { role: "user", content: req.body.message },
        
        {
          role: "system",
          content:
            "There is a three-day processing period between application and acceptance."
        },
        {
          role: "system",
          content:
            "Lessons are pre-recorded and made available to learners via the Learner Management System (LMS). A live session will be held at regular intervals for additional support."
        },
        
        {
          role: "system",
          content:
            "Learners will use the recording, assessments, and any material required as per their schedule of work that will be drawn up and shared with them by the facilitator."
        },
        {
          role: "system",
          content:
            "For fincial queries Send an email to finance@qurtubaonline.co.za or hit the help widget, or you can call our office on (+27) 10 109 1784."
        },
        {
          role: "system",
          content:
            "For Queries contact us on (+27) 10 109 1784 or email us at info@qurtubaonline.co.za or visit our website at qurtubaonline.co.za."
        },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
