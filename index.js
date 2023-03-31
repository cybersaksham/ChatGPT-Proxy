const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const responseData = await response.json();
    const answer = responseData.choices[0].text.trim();

    return res.json({ answer });
  } catch (e) {
    return res.json({ error: "Server Error" });
  }
});

app.listen(port, () => {
  console.log(`ChatGPT proxy server listening at http://localhost:${port}`);
});
