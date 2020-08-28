const nodemailer = require('nodemailer');
const  express = require('express');
const app = express();
const path = require('path')
require('dotenv').config()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))

app.post('/contact',(req,res,next)=>{
  const { email, name, message } = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS
    }
  });

  var mailOptions = {
    from: 'Kaisha Jones Portfolio',
    to: process.env.NODEMAILER_EMAIL,
    subject: `New Message ${name}`,
    html: `<div>
            <h3>New message from ${name},</h3>
            <p>${message}</p>
            <p>${name}</p>
            <p>${email}</p>
          </div>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Message not sent"
      });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).sendFile(path.join(__dirname, './public', 'index.html'))
    }
  });
});

app.use('*',(req, res, next)=>{
  return res.status(200).sendFile(path.join(__dirname, './public', 'index.html'))
})

  const port = process.env.PORT || 3000;

  app.listen(port);
