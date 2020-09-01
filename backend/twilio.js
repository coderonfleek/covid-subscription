//Setup Twilio SMS
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);

//Setup Twilio SendGrid Mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.TWILIO_SENDGRID_API_KEY);

const TwilioService = {
  sendMessage,
  sendMail
};

async function sendMessage(recipient, message) {
  const sendResponse = await client.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to: recipient
  });

  return sendResponse;
}

async function sendMail(msgObject) {
  msgObject.from = "fikfikky@gmail.com";
  const mailSentResponse = await sgMail.send(msgObject);

  return mailSentResponse;
}

module.exports = TwilioService;
