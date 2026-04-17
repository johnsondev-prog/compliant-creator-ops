function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
  appAdminEmail: process.env.APP_ADMIN_EMAIL || 'founder@example.com',
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  paystackWebhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFrom: process.env.RESEND_FROM,
  requirePaystackSecret() {
    return required('PAYSTACK_SECRET_KEY');
  },
  requireWebhookSecret() {
    return required('PAYSTACK_WEBHOOK_SECRET');
  },
  requireResendKey() {
    return required('RESEND_API_KEY');
  },
  requireResendFrom() {
    return required('RESEND_FROM');
  },
};
