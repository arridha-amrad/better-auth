import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export const sendEmail = async ({
  subject,
  text,
  to,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  await transporter.sendMail({
    from: "Better-Auth",
    to,
    subject,
    text,
  });
};
