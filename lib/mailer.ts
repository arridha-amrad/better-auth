import nodemailer from "nodemailer";
import { google } from "googleapis";

const g = {
  cid: process.env.GOOGLE_CLIENT_ID,
  cse: process.env.GOOGLE_CLIENT_SECRET,
  ret: process.env.GOOGLE_REFRESH_TOKEN,
  usr: process.env.GOOGLE_USER,
};

const oauth2Client = new google.auth.OAuth2({
  clientId: g.cid,
  clientSecret: g.cse,
  redirectUri: "https://developers.google.com/oauthplayground",
});

oauth2Client.setCredentials({
  refresh_token: g.ret,
});

const token = await oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  // @ts-expect-error: it's ok
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: g.cid,
    clientSecret: g.cse,
    refreshToken: g.ret,
    accessToken: token.token,
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
    to,
    subject,
    text,
  });
};
