import crypto from 'node:crypto';
import { env } from './env';

const paystackBaseUrl = 'https://api.paystack.co';

type InitializeArgs = {
  email: string;
  amountNgn: number;
  reference: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
};

export async function initializeTransaction(args: InitializeArgs) {
  const response = await fetch(`${paystackBaseUrl}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.requirePaystackSecret()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: args.email,
      amount: Math.round(args.amountNgn * 100),
      reference: args.reference,
      callback_url: args.callbackUrl,
      metadata: args.metadata,
      currency: 'NGN',
    }),
  });

  const payload = await response.json();
  if (!response.ok || !payload.status) {
    throw new Error(payload.message || 'Failed to initialize Paystack transaction');
  }

  return payload.data;
}

export async function verifyTransaction(reference: string) {
  const response = await fetch(`${paystackBaseUrl}/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${env.requirePaystackSecret()}`,
    },
  });

  const payload = await response.json();
  if (!response.ok || !payload.status) {
    throw new Error(payload.message || 'Failed to verify Paystack transaction');
  }

  return payload.data;
}

export function validatePaystackSignature(rawBody: string, signature: string | undefined) {
  if (!signature) {
    return false;
  }

  const hash = crypto
    .createHmac('sha512', env.requireWebhookSecret())
    .update(rawBody)
    .digest('hex');

  return hash === signature;
}
