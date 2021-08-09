const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aliant', notif : '' });
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages.");
  }
});

router.post('/send', (req, res) => {

  let form = new multiparty.Form();
  let data = {};

  form.parse(req, function (error, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: `Site Aliant : "${data.subject}"`,
      text: `${data.name} <${data.email}> \n${data.message}`,
      replyTo: data.email
    };

    transporter.sendMail(mail, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Une erreur s'est produite.");
        //res.status(500).json({status: 'error'});
      }
      else {
        res.status(200).send("Email envoyé !");
        //res.status(200).json({status: 'success'});
      }
    });
  });
});

module.exports = router;
