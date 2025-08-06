import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { runRAG } from './utils/rag';
import { getMemory, storeMessage } from './utils/memory';
import { weatherPlugin, mathEvaluator } from './plugins';
import OpenAI from 'openai'; // ✅ Updated for OpenAI v4

dotenv.config();

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

// ✅ Correct initialization for OpenAI v4
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/agent/message', async (req, res) => {
  const { message, session_id } = req.body;
  if (!message || !session_id) {
    return res.status(400).json({ error: 'Missing message or session_id' });
  }

  // 1. Store current message
  storeMessage(session_id, { role: 'user', content: message });

  // 2. Retrieve last two messages from memory
  const memory = getMemory(session_id);
  const lastTwo = memory.slice(-2).map(m => `${m.role}: ${m.content}`).join('\n');

  // 3. RAG retrieval
  const retrievedChunks = await runRAG(message);

  // 4. Plugin system
  let pluginResult = '';
  if (/weather/i.test(message)) pluginResult = await weatherPlugin(message);
  if (/\d+\s*[*+\/-]\s*\d+/i.test(message)) pluginResult = mathEvaluator(message);

  // 5. Prompt construction
  const prompt = `
  You are a helpful assistant.

  Memory:
  ${lastTwo}

  Retrieved Info:
  ${retrievedChunks.join('\n\n')}

  Plugin Output:
  ${pluginResult || 'none'}

  Respond to user: "${message}"
  `;

  // 6. OpenAI response
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: prompt }
    ]
  });

  const reply = completion.choices[0]?.message?.content || 'No reply generated.';
  storeMessage(session_id, { role: 'assistant', content: reply });
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`✨ Server running on port ${PORT}`);
});
