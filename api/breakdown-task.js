import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal } = req.body || {};
  if (!goal) {
    return res.status(400).json({ error: 'Goal is required' });
  }

  const fallbackTasks = [
    { id: 't1', title: `Master fundamentals of ${goal}`, timeEstimate: '30 mins', completed: false },
    { id: 't2', title: `Review practice questions and examples`, timeEstimate: '45 mins', completed: false },
    { id: 't3', title: `Take a targeted quiz on ${goal}`, timeEstimate: '20 mins', completed: false },
    { id: 't4', title: `Summarize key concepts in a cheat sheet`, timeEstimate: '25 mins', completed: false }
  ];

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ tasks: fallbackTasks });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const schema = {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          id: { type: SchemaType.STRING, description: "A unique short id (e.g. t1, t2)" },
          title: { type: SchemaType.STRING, description: "Actionable subtask title" },
          timeEstimate: { type: SchemaType.STRING, description: "Estimated time to complete" },
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
        responseSchema: schema
      }
    });

    const parsed = JSON.parse(result.response.text());
    const tasks = Array.isArray(parsed) ? parsed : (parsed.tasks || fallbackTasks);
    return res.status(200).json({ tasks });
  } catch (err) {
    console.error('Gemini error:', err);
    return res.status(200).json({ tasks: fallbackTasks });
  }
}
