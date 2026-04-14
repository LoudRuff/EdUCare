const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const OPENROUTER_API_KEY = "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";

app.post("/ask", async (req, res) => {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o",
                messages: [{ role: "user", content: req.body.question }]
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`
                }
            }
        );

        res.json({
            answer: response.data.choices[0].message.content
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000);