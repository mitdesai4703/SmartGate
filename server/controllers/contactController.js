import nodemailer from "nodemailer";

export const sendContactMail = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    });

    const mailOptions = {
      from: `"SmartGate Contact" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL, 
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #2563eb;">New Message from SmartGate Contact Form</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f3f4f6; padding: 10px; border-radius: 5px;">
            ${message}
          </div>
          <br/>
          <p style="font-size: 12px; color: gray;">This email was sent from SmartGate Contact Form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send failed:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
