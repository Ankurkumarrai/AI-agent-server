import fs from 'fs';
import path from 'path';
import { cosineSimilarity } from './similarity';
import { getEmbedding } from './embedding';

const dataPath = path.join(__dirname, '../../data');

export async function runRAG(query: string): Promise<string[]> {
  const queryEmbedding = await getEmbedding(query);
  const files = fs.readdirSync(dataPath).filter(f => f.endsWith('.md'));

  const chunks: { content: string; score: number }[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(dataPath, file), 'utf-8');
    const contentEmbedding = await getEmbedding(content);
    const score = cosineSimilarity(queryEmbedding, contentEmbedding);
    chunks.push({ content, score });
  }

  return chunks
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(chunk => chunk.content);
}
