const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path"); 


const sendEmail = async (email, subject, payload, template) => {
// let mailerConfig = {
//     host: os.hostname(),
//     port: 25,
// };
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465, 
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });

  await  transporter.verify(function(err, success) {
      if(err) { 
          return err;
      } else { 
          return success;
      }
    })

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
    }; 

    // Send email
  await  transporter.sendMail(mailOptions, (error, info) => {
      if (error) { 
          return error;
      } else { 
          return info;
      }
    });
  } catch (error) {
    return error;
  }
};
 

module.exports = sendEmail;