'use strict';

const request = require('request');

exports.handleInviteRequest = (req, res) => {
  var email = req.body.email;
  var url = 'https://serverlessfloripa.slack.com/api/users.admin.invite';
  var slackToken = 'xoxp-416775999249-416776000641-441300168931-a2d7deee1de644df437fb3f3be670b0a';
  var formData = {email: email, token: slackToken, set_active:true};

  request.post({
    url: url,
    form: formData
  }, function(err, httpResponse, body){
    res.status(200).send(body);
  });
};

