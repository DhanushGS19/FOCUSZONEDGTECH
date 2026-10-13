const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Require API Key
if (!process.env.GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not set. AI Features will not work.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy");

app.post('/api/breakdown-task', async (req, res) => {
  try {
    const { goal } = req.body;
    
    if (!goal) {
      return res.status(400).json({ error: 'Goal is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
       return res.status(500).json({ error: 'GEMINI_API_KEY missing on backend' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const schema = {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING, description: "A unique short id (e.g. t1, t2)" },
          title: { type: SchemaType.STRING, description: "Actionable subtask title" },
          timeEstimate: { type: SchemaType.STRING, description: "Estimated time to complete (e.g., '30 mins', '2 hours')" },
          completed: { type: SchemaType.BOOLEAN, description: "Always false" }
        },
        required: ["id", "title", "timeEstimate", "completed"]
      }
    };

    const prompt = `Break down the following learning goal into small, actionable subtasks: "${goal}". For each subtask, provide a title, a time estimate, a unique id, and set completed to false. Limit to 4-6 subtasks.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const responseText = result.response.text();
    const tasks = JSON.parse(responseText);

    res.json({ tasks });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Failed to break down task. Please try again.' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Cloud Run backend running locally on port ${PORT}`);
});
