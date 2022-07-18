/*
 *   Copyright (c) 2021 
 *   All rights reserved.
 */
const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
const hcaptcha = require('hcaptcha');
const cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Aliant'});
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {title: 'Aliant'});
});

// middleware
router.use(cors());





// validate takes an hCaptcha secret and returns
// an express middleware function
const hcaptcha_middleware_validate = (secret) => (req, res, next) => {

  console.log(req.body);

  // get token from the body
  // requires the body parser JSON middleware
  // on the app that uses this middleware
  const token = req.body && req.body.token;

  // call next with an error if no token present
  if (!token) {
    const err = new Error('bad request - no token provided in body');
    err.status = 400;
    return next(err);
  }

  // verify the hcaptcha and continue on success
  // call next with an error if verification errors or fails
  return hcaptcha.verify(secret, token)
    .then((data) => {
      req.hcaptcha = data;
      if (data.success) {
        return next();
      }
      const err = new Error(`bad request - ${data['error-codes']}`);
      err.status = 400;
      return next(err);
    })
    .catch(next);
};





//nodemailer
const transporter = nodemailer.createTransport({
  host: 'auth.smtp.1and1.fr',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

router.post('/send', hcaptcha_middleware_validate(process.env.HCAPTCHA_SECRET_KEY), (req, res) => {

  let form = new multiparty.Form();
  let data = {};

  form.parse(req, function (err, fields) {
    console.log(fields);

    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    if (data.miel !== '') {
      data.subject = `[BOT] ${data.subject}`;
    }

    const mail = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.firstname} ${data.lastname} <${data.email}> \n${data.message}`,
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).render('error');
      } else {
        res.status(200).render('sent');
      }
    });
  });
});

module.exports = router;
