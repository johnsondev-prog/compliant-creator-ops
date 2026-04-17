export function allowMethods(method: string | undefined, allowed: string[]) {
  if (!method || !allowed.includes(method)) {
    return {
      ok: false,
      status: 405,
      body: { error: `Method not allowed. Use: ${allowed.join(', ')}` },
    };
  }

  return { ok: true };
}

export function sendJson(response: any, status: number, body: unknown) {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(body));
}

export async function readJsonBody<T>(request: any): Promise<T> {
  if (request.body && typeof request.body === 'object') {
    return request.body as T;
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return JSON.parse(raw || '{}') as T;
}
