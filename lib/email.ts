import nodemailer from 'nodemailer';

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function isConfigured(): boolean {
  const configured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
  if (!configured) {
    console.warn('Email SMTP not configured. EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'MISSING', 'EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'MISSING');
  }
  return configured;
}

export async function sendWelcomeEmail(to: string, name?: string) {
  if (!isConfigured()) {
    console.warn('Email not configured. Skipping welcome email.');
    return;
  }

  const firstName = name?.split(' ')[0] || 'there';

  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'PaisaGuru AI <noreply@paisaguru.com>',
    to,
    subject: 'Welcome to PaisaGuru! Here\'s your Free Tax Saving Guide 🎉',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #059669, #047857); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">₹ PaisaGuru AI</h1>
          <p style="color: #d1fae5; margin-top: 8px; font-size: 14px;">India's Trusted Personal Finance Guide</p>
        </div>

        <div style="padding: 32px;">
          <h2 style="color: #111827; margin-top: 0;">Hey ${firstName}! 👋</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Welcome to PaisaGuru! You've joined <strong>50,000+ Indians</strong> who are making smarter money decisions.
          </p>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #059669; margin-top: 0;">📘 Your Free Tax Saving Guide 2025-26</h3>
            <p style="color: #4b5563; font-size: 14px; margin-bottom: 16px;">
              Learn how to save up to ₹1.5 lakh in taxes with Section 80C, 80D, HRA, NPS, and more.
            </p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://paisaguru.com'}/category/income-tax"
               style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
              Read Tax Saving Guide →
            </a>
          </div>

          <h3 style="color: #111827;">Here's what you get every week:</h3>
          <ul style="color: #4b5563; line-height: 2;">
            <li>💡 Tax saving tips and strategies</li>
            <li>📊 Investment ideas and mutual fund picks</li>
            <li>🧮 New calculators and financial tools</li>
            <li>📰 Important finance news that affects your wallet</li>
          </ul>

          <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-top: 24px;">
            <p style="color: #92400e; font-size: 13px; margin: 0;">
              <strong>Quick start:</strong> Try our free
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://paisaguru.com'}/calculators/income-tax" style="color: #059669;">Income Tax Calculator</a>
              to see how much tax you can save this year.
            </p>
          </div>
        </div>

        <div style="background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            You received this because you subscribed at PaisaGuru.com<br>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://paisaguru.com'}" style="color: #059669;">Visit Website</a> ·
            Reply to this email to unsubscribe
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendEmail(to: string, subject: string, html: string) {
  if (!isConfigured()) {
    console.warn('Email not configured. Skipping email send.');
    return;
  }

  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'PaisaGuru AI <noreply@paisaguru.com>',
    to,
    subject,
    html,
  });
}

export default { sendWelcomeEmail, sendEmail };
