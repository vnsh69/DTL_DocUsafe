const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create reusable transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    // Define email options
    const message = {
        from: process.env.SMTP_FROM,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // Send email
    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail; 