const express = require('express');
const router = express.Router();
const db = require('../db/models');
const axios = require('axios');
let access_token = '';
let userDetails = {};
router.get('/', (req, res) => {
  res.send('Hello World from API!');
});

router.get('/signin/callback', (req, res, next) => {
  const reqtoken = req.query.code;
  console.log(
    'query',
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRECT_KEY,
    reqtoken
  );
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRECT_KEY}&code=${reqtoken}`,
    headers: {
      accept: 'application/json',
    },
  })
    .then((response) => {
      access_token = response.data.access_token;
      res.redirect(`/api/success`);
    })
    .catch((err) => {
      console.log('Error');
    });
});
router.get('/success', (req, res) => {
  console.log('req :', access_token);

  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token,
    },
  }).then((response) => {
    console.log('response :', response.data);
    // res.render('pages/success',{ userData: response.data });
    userDetails = response.data;
    res.redirect('http://localhost:3000/results');
  });
});
router.get('/fetchUser', async (req, res) => {
  res.send(userDetails);
});
router.get('/users', async (req, res) => {
  const users = await db.User.findAll();
  res.send({ count: users.length, users });
});

router.get('/credentials', async (req, res) => {
  const credentials = await db.Credentials.findAll();
  res.send({ count: credentials.length, credentials });
});

router.post('/users', async (req, res) => {
  const payload = req.body;
  await db.User.create({
    username: payload.username,
    password: payload.password,
  });
  res.send();
});

router.post('/credentials', async (req, res) => {
  const payload = req.body;
  await db.Credentials.create({
    appName: payload.appName,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  });
  res.send();
});

router.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  await db.User.destroy({
    where: {
      id: userId,
    },
  });
  res.status(204).send();
});

router.delete('/credentials/:credentialsId', async (req, res) => {
  const credentialsId = req.params.credentialsId;

  await db.Credentials.destroy({
    where: {
      id: credentialsId,
    },
  });
  res.status(204).send();
});

router.get('/github/test-request', async (req, res) => {
  const githubClient = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      Accept: 'application/json',
    },
  });

  const octocat = (await githubClient.get('/users/octocat')).data;

  res.send(octocat);
});

/**
 * TODO:
 *  - routes for handling authorization
 *  - save obtained credentials in db
 *  - routes to get the asked data from github api using the stored credentials
 */

module.exports = router;
