import { z } from 'zod';
import { allowMethods, readJsonBody, sendJson } from '../_lib/http';
import { sendWelcomeEmail } from '../_lib/resend';

const payloadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).optional(),
});

export default async function handler(request: any, response: any) {
  const methodCheck = allowMethods(request.method, ['POST']);
  if (!methodCheck.ok) {
    return sendJson(response, methodCheck.status, methodCheck.body);
  }

  try {
    const payload = payloadSchema.parse(await readJsonBody(request));
    const result = await sendWelcomeEmail(payload.email, payload.firstName);
    return sendJson(response, 200, { ok: true, result });
  } catch (error) {
    return sendJson(response, 400, {
      error: error instanceof Error ? error.message : 'Email send failed',
    });
  }
}
