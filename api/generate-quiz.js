import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export default async function handler(req, res) {
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

  let body = req.body;
  if (!body && req.readable) {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const raw = Buffer.concat(buffers).toString();
      body = JSON.parse(raw);
    } catch {
      body = {};
    }
  } else if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const { topic = 'Computer Science', count = 3 } = body || {};

  const fallbackQuestions = {
    quizTitle: `${topic} Mastery Quiz`,
    questions: [
      {
        q: `What is the primary benefit of mastering ${topic}?`,
        options: ["Better architectural reasoning", "Faster system execution", "Improved algorithmic efficiency", "All of the above"],
        answer: 3,
        explanation: "Mastery gives comprehensive insight into architecture, execution speed, and modular algorithm design."
      },
      {
        q: `Which strategy is most effective when preparing for exams in ${topic}?`,
        options: ["Passive re-reading", "Active recall & practice questions", "Cramming the night before", "Memorizing without understanding"],
        answer: 1,
        explanation: "Active recall and deliberate practice create durable long-term memory traces."
      },
      {
        q: `When designing solutions in ${topic}, why is modularity essential?`,
        options: ["Simplifies maintenance and testing", "Guarantees zero memory usage", "Eliminates need for documentation", "Makes code run in parallel automatically"],
        answer: 0,
        explanation: "Modularity decouples dependencies, isolating components so they are easier to maintain, test, and debug."
      }
    ]
  };

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json(fallbackQuestions);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        quizTitle: { type: SchemaType.STRING },
        questions: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              q: { type: SchemaType.STRING, description: "Question text" },
              options: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "4 distinct answer options"
              },
              answer: { type: SchemaType.INTEGER, description: "Zero-based index of correct option (0-3)" },
              explanation: { type: SchemaType.STRING, description: "Clear rationale for the correct answer" }
            },
            required: ["q", "options", "answer", "explanation"]
          }
        }
      },
      required: ["quizTitle", "questions"]
    };

    const prompt = `Generate a high quality ${count}-question quiz evaluating practical knowledge in "${topic}". Ensure questions are challenging yet fair, with 4 plausible options, zero-based index of the correct answer, and an educational explanation.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    const parsed = JSON.parse(result.response.text());
    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Gemini quiz generation error:', err);
    return res.status(200).json(fallbackQuestions);
  }
}
