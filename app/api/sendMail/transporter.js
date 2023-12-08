import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Hostinger's SMTP server hostname
    port: 587, // Hostinger's recommended SMTP port
    secure: false, // Hostinger typically uses TLS, so set to true if necessary
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD // Your email password (consider using an app-specific password)
    },
  });

  export default transporter