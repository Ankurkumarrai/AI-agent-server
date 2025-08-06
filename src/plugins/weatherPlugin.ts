export async function weatherPlugin(query: string): Promise<string> {
  const location = query.match(/in (\w+)/i)?.[1] || 'your city';
  return `The weather in ${location} is sunny with 30°C (mocked data).`;
}
