import { GoogleGenerativeAI } from '@google/generative-ai';

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

  const { message, subject } = body || {};
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const fallbackReply = `Here are the key points regarding **${message}**:\n\n` +
      `• **Core Concept**: Break complex topics into atomic, testable pieces.\n` +
      `• **Practical Application**: Write quick notes and test yourself using active recall.\n` +
      `• **Next Steps**: Set a 25-minute Pomodoro timer in TechVerse to master this subject.`;
    return res.status(200).json({ reply: fallbackReply });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are TechVerse AI, an expert, encouraging technology learning coach and senior engineering tutor. Provide structured, accurate, and concise explanations using markdown bullet points, bold key terms, and practical examples suitable for students."
    });

    const prompt = subject 
      ? `Topic/Subject: ${subject}\nStudent Question: ${message}\nProvide a clear, engaging explanation with key takeaways.`
      : `Student Question: ${message}\nProvide a clear, engaging explanation with key takeaways.`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Gemini chat error:', err);
    return res.status(200).json({
      reply: "I encountered a brief network hiccup, but here's a study principle: Frame the core idea in your own words, quiz yourself on edge cases, and apply it in a mini problem."
    });
  }
}
