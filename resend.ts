import { Resend } from 'resend';
import { env } from './env';

export async function sendWelcomeEmail(email: string, firstName?: string) {
  const resend = new Resend(env.requireResendKey());
  const greeting = firstName ? `Hi ${firstName},` : 'Hi,';

  return resend.emails.send({
    from: env.requireResendFrom(),
    to: email,
    subject: 'Welcome to Minimalist Creator Ops',
    html: `
      <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #101828;">
        <p>${greeting}</p>
        <p>Your account is set up. You can now complete checkout and manage orders from your dashboard.</p>
        <p>Move fast, keep the workflow tight, and verify every payment before fulfillment.</p>
      </div>
    `,
  });
}
