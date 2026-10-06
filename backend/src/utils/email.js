/**
 * Sends a notification when a new contact message is received.
 * Can be integrated with Nodemailer, SendGrid, or Resend.
 */
const sendContactNotification = async ({ name, email, subject, message }) => {
  console.log('----------------------------------------------------');
  console.log('📧 [NOTIFICATION] New Contact Inquiry Received:');
  console.log(`From:    ${name} <${email}>`);
  console.log(`Subject: ${subject || 'No Subject'}`);
  console.log(`Message: ${message}`);
  console.log('----------------------------------------------------');
  return true;
};

module.exports = {
  sendContactNotification
};
