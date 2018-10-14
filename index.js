'use strict';
const cors = require('cors');

const request = require('request');
const url = 'https://serverlessfloripa.slack.com';
const inviteEndpoint = url + '/api/users.admin.invite';
const slackToken = process.env.SLACK_TOKEN;

const handleInvite = (req, res) => {
  const requestBody = req.body;
  const email = requestBody.email;
  const formData = {email: email, token: slackToken, set_active:true};

  request.post({
    url: inviteEndpoint,
    form: formData
  }, (err, httpResponse, body) => {
    if (err) { res.status(500).send('Error ' + err); }
    const parsedBody = JSON.parse(body);
    if (parsedBody.ok === true) {
      res.status(200).send(body);
    } else {
      const error = parsedBody.error;
      let errorMsg = 'Get in touch with our channel admin: ricardolima89@gmail.com';
      if (error === 'already_invited'){
        errorMsg = 'You were already invited! check your e-mail.';
      } else if (error === 'already_in_team'){
        errorMsg = 'You are already part of our Slack channel. Visit <a href="'+url+'">'+ url+ '</a>';
      } else if (error === 'invalid_email'){
        errorMsg = 'Please type a valid email :) ';
      }
      res.status(400).send(errorMsg);
    }
  });
};

exports.handleInviteRequest = (req, res) => {
  const corsFn = cors();
  corsFn(req, res, function() {
    handleInvite(req, res);
  });
};

