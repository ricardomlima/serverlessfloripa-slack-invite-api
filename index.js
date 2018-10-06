'use strict';

const request = require('request');
const url = 'https://serverlessfloripa.slack.com';

exports.handleInviteRequest = (req, res) => {
  var email = req.body.email;
  var slackToken = process.env.SLACK_TOKEN;
  var formData = {email: email, token: slackToken, set_active:true};
  var inviteEndpoint = url + '/api/users.admin.invite';

  request.post({
    url: inviteEndpoint,
    form: formData
  }, (err, httpResponse, body) => {
    if (err) { res.status(500).send('Error ' + err); }

    let parsedBody = JSON.parse(body);

    if (parsedBody.ok === true) {
      res.status(200).send(body);
    } else {
      let error = parsedBody.error;
      let errorMsg = 'Entre em contato com o administrador do canal: ricardolima89@gmail.com';
      if (error === 'already_invited'){
        errorMsg = 'Você já foi convidado! Verifique seu e-mail.';
      } else if (error === 'already_in_team'){
        errorMsg = 'Você já faz parte do canal. Visite '+ url;
      } else if (error === 'invalid_email'){
        errorMsg = 'Digite um email válido :) ';
      }
      res.status(400).send(errorMsg);
    }
  });
};

