import { validatePaystackSignature } from '../_lib/paystack';
import { sendJson } from '../_lib/http';
import { findOrderByPaymentReference, updateOrder } from '../_lib/storage';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    return sendJson(response, 405, { error: 'Method not allowed' });
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  const rawBody = Buffer.concat(chunks).toString('utf8');

  const isValid = validatePaystackSignature(rawBody, request.headers['x-paystack-signature']);
  if (!isValid) {
    return sendJson(response, 401, { error: 'Invalid webhook signature' });
  }

  const payload = JSON.parse(rawBody);
  const reference = payload?.data?.reference as string | undefined;
  const event = payload?.event as string | undefined;

  if (reference && event === 'charge.success') {
    const order = findOrderByPaymentReference(reference);
    if (order) {
      updateOrder(order.id, { status: 'paid' });
    }
  }

  return sendJson(response, 200, { received: true });
}
