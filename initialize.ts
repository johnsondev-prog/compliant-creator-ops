import crypto from 'node:crypto';
import { z } from 'zod';
import { allowMethods, readJsonBody, sendJson } from '../_lib/http';
import { initializeTransaction } from '../_lib/paystack';
import { createOrder } from '../_lib/storage';

const payloadSchema = z.object({
  email: z.string().email(),
  amountNgn: z.number().positive(),
  product: z.string().min(2),
  metadata: z.record(z.unknown()).optional(),
});

export default async function handler(request: any, response: any) {
  const methodCheck = allowMethods(request.method, ['POST']);
  if (!methodCheck.ok) {
    return sendJson(response, methodCheck.status, methodCheck.body);
  }

  try {
    const payload = payloadSchema.parse(await readJsonBody(request));
    const reference = `mco_${Date.now()}`;
    const order = createOrder({
      id: crypto.randomUUID(),
      email: payload.email,
      product: payload.product,
      amountNgn: payload.amountNgn,
      status: 'pending',
      provider: 'manual',
      paymentReference: reference,
      metadata: payload.metadata,
    });

    const data = await initializeTransaction({
      email: payload.email,
      amountNgn: payload.amountNgn,
      reference,
      callbackUrl: `${process.env.APP_BASE_URL || 'http://localhost:3000'}/orders?reference=${reference}`,
      metadata: {
        orderId: order.id,
        product: payload.product,
        ...(payload.metadata ?? {}),
      },
    });

    return sendJson(response, 200, {
      authorizationUrl: data.authorization_url,
      accessCode: data.access_code,
      reference,
      orderId: order.id,
    });
  } catch (error) {
    return sendJson(response, 400, {
      error: error instanceof Error ? error.message : 'Unable to initialize payment',
    });
  }
}
