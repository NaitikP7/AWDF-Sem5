const express = require("express");

const router = express.Router();
const GEMINI_MODEL = "gemini-3.6-flash";

// Keep the task form usable when Gemini is not configured or unavailable.
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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return res.status(200).json({
      success: true,
      description: getFallbackDescription(title),
      fallback: true,
      reason: "Gemini API key is not configured. Used the built-in suggestion instead.",
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Write a short, clear, actionable task description in 1-2 sentences for: "${title.trim()}". Return only the description.`,
            }],
          }],
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || `Gemini returned HTTP ${response.status}`);
    }

    const description = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!description) {
      throw new Error("Gemini returned an empty description.");
    }

    return res.status(200).json({
      success: true,
      description,
      fallback: false,
      provider: "gemini",
    });
  } catch (error) {
    console.error(`[AI] Gemini request failed: ${error.message}`);
    return res.status(200).json({
      success: true,
      description: getFallbackDescription(title),
      fallback: true,
      reason: "Gemini is unavailable right now. Used the built-in suggestion instead.",
    });
  }
});

module.exports = router;
