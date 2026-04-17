import { z } from 'zod';
import { allowMethods, sendJson } from '../_lib/http';
import { verifyTransaction } from '../_lib/paystack';
import { findOrderByPaymentReference, updateOrder } from '../_lib/storage';

const querySchema = z.object({
  reference: z.string().min(3),
});

export default async function handler(request: any, response: any) {
  const methodCheck = allowMethods(request.method, ['GET']);
  if (!methodCheck.ok) {
    return sendJson(response, methodCheck.status, methodCheck.body);
  }

  try {
    const { reference } = querySchema.parse(request.query);
    const transaction = await verifyTransaction(reference);
    const order = findOrderByPaymentReference(reference);

    if (transaction.status === 'success' && order) {
      updateOrder(order.id, { status: 'paid' });
    }

    return sendJson(response, 200, {
      ok: true,
      transaction,
      order,
    });
  } catch (error) {
    return sendJson(response, 400, {
      error: error instanceof Error ? error.message : 'Verification failed',
    });
  }
}
