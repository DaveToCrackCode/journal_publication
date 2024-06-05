import nodemailer from  'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dangig976@gmail.com',
      pass: 'wcxcxdecxgjqurud'
    }
  });

  const sendEmail = async (to,htmlData,subData) => {
    try {
      // Send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'dangig976@gmail.com',
        to:to,
        subject: subData,
        html:htmlData
      });
  
      console.log('Email sent: %s', info.messageId);
      return info.messageId;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  export {sendEmail}
  