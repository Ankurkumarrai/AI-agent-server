type Message = { role: string; content: string };
const memoryStore: Record<string, Message[]> = {};

export function storeMessage(sessionId: string, message: Message) {
  if (!memoryStore[sessionId]) memoryStore[sessionId] = [];
  memoryStore[sessionId].push(message);
}

export function getMemory(sessionId: string): Message[] {
  return memoryStore[sessionId] || [];
}
