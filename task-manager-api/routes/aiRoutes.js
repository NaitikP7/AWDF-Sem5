const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

// Fallback task description generator based on keywords in title
const getFallbackDescription = (title) => {
  const cleanTitle = (title || "").trim();
  return `Organize, execute, and verify completion criteria for "${cleanTitle}". Ensure deliverables meet quality and time benchmarks.`;
};

router.post("/generate-description", async (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: { message: "Task title is required to generate a description." },
    });
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  // 1. If Gemini API key is provided, use Google Gemini (100% free tier available)
  if (geminiApiKey && geminiApiKey !== "your_gemini_api_key_here") {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Write a short, clear, actionable task description (1-2 sentences) for this task: "${title.trim()}". Return only the description text.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const geminiData = await response.json();
      const geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (geminiText) {
        return res.status(200).json({
          success: true,
          description: geminiText,
          fallback: false,
          provider: "gemini",
        });
      }
    } catch (geminiErr) {
      console.warn("[AI] Gemini API failed, attempting OpenAI or fallback:", geminiErr.message);
    }
  }

  // 2. If OpenAI API key is provided
  if (openaiApiKey && openaiApiKey !== "your_openai_api_key_here") {
    try {
      const client = new OpenAI({ apiKey: openaiApiKey });
      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant for a task management app. Generate a clear, concise, actionable task description (1-2 sentences) based on the task title.",
          },
          {
            role: "user",
            content: `Write a short task description for: ${title.trim()}`,
          },
        ],
        max_tokens: 100,
      });

      const generatedDescription = completion.choices[0]?.message?.content?.trim();
      if (generatedDescription) {
        return res.status(200).json({
          success: true,
          description: generatedDescription,
          fallback: false,
          provider: "openai",
        });
      }
    } catch (err) {
      console.error("[AI] OpenAI API error:", err.message);
      // Practical 13 requirement:
      // "On API failure: catch error → return fallback message → app keeps working"
      return res.status(200).json({
        success: true,
        description: getFallbackDescription(title),
        fallback: true,
        reason: `AI service quota exceeded (429). Used smart fallback.`,
      });
    }
  }

  // 3. Fallback when neither key is active
  return res.status(200).json({
    success: true,
    description: getFallbackDescription(title),
    fallback: true,
    reason: "No active AI API key configured. Used smart fallback.",
  });
});

module.exports = router;
