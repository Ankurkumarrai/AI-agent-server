export function mathEvaluator(input: string): string {
  try {
    const expression = input.match(/([\d\s+\-*\/().]+)/)?.[1] || '';
    const result = eval(expression);
    return `Math result: ${expression} = ${result}`;
  } catch {
    return 'Invalid math expression.';
  }
}
