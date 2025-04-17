import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function sendTestAlertEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "[BTFD ALERT] It’s listed!",
    text: "Your BTFD token has just been marked as Listed!"
  });

  console.log("📨 Test email sent!");
}

export default sendTestAlertEmail;