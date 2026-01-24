import nodemailer from "nodemailer";

async function createTransporter() {
  // If SMTP env vars are not set, create an Ethereal test account for development
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || (process.env.SMTP_SECURE === "true" ? 465 : 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Send an email.
 * @param {{to:string, subject:string, text?:string, html?:string}} options
 * @returns {Promise<object>} nodemailer send result
 */
export default async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `${process.env.FROM_NAME || "Benevolent World"} <${process.env.FROM_EMAIL || process.env.SMTP_USER || "no-reply@benevolentworld.com"}>`,
      to,
      subject,
      text,
      html,
    });

    // If using Ethereal (test account), print a preview URL
    try {
      const preview = nodemailer.getTestMessageUrl(info);
      if (preview) console.log("Preview URL: %s", preview);
    } catch (e) {
      // ignore if not available
    }

    return info;
  } catch (error) {
    console.error("sendEmail error:", error);
    throw error;
  }
}
