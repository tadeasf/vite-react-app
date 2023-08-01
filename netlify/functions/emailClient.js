/** @format */

const sgMail = require("@sendgrid/mail");

exports.handler = async (event, context) => {
  try {
    const { email, name, message } = JSON.parse(event.body);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: process.env.EMAIL_TO,
      from: "noreply@em9776.tadeasfort.com", // Use your authenticated domain
      replyTo: email, // The sender's email
      subject: `New message from ${name}`, // Include the sender's name in the subject
      text: `${message}\n\nReply to this email to respond to ${name} at ${email}.`, // Include the sender's email in the body
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent" }),
    };
  } catch (error) {
    console.error(error.response.body);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
