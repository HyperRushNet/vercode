import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Genereer een 6-cijferige code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Nodemailer configureren met SMTP (bijvoorbeeld Gmail)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verificatiecode",
    text: `Je verificatiecode is: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, code });
  } catch (error) {
    return res.status(500).json({ error: "Email sending failed", details: error.message });
  }
}
