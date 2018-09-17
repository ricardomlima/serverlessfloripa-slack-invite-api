'use strict';

const got = require('got');

exports.handleInviteRequest = (req, res) => {
  var email = req.body.email;
  var url = 'https://slack.com/api/users.admin.invite';
  var slackToken = 'uc1gsvagA4gSsnC1bEFUwrEg';
  var formData = JSON.stringify({email: email, token: slackToken});
  var headers = {'Content-Type':'application/x-www-form-urlencoded'};

  (async () => {
    const myresponse = await got.post(url, {body:formData, headers:headers});
    res.status(200).send(myresponse.body);
  })();

};

