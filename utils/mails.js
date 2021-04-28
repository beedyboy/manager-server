const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path"); 

const mails = {
  mailNow: async(email, subject, payload, template) => {
  var reply = null;
    try {
        // create reusable transporter object using the default SMTP transport
        const transporter =  nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: 26,
          ssl: false,
          debug: true,
          logger: true,
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
          },
        });
    
        transporter.verify(function(err, success) {
          if(err) { 
              reply =  err;
          } else { 
              reply =  success;
          }
        })
    
        const source =  fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
          const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        }; 
    
        // Send email
       transporter.sendMail(mailOptions, (error, info) => {
          if (error) { 
              reply =  error;
          } else { 
              reply =  info;
          }
        });
      } catch (error) {
        reply =  error;
      }
      return reply;
  },  
  test: async (file) => {
    

    return `i am testiing this ${file}`;
  },
};

module.exports = mails;
