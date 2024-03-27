import nodemailer from  'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password'
    }
  });

  const sendEmail = async (to) => {
    try {
      // Send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'your_email@gmail.com',
        to:to,
        subject: "Journal Publication Allowtment ",
        text:"You have allowted Journal from reviewing please check the website and confirm it",
      });
  
      console.log('Email sent: %s', info.messageId);
      return info.messageId;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  export {sendEmail}
  