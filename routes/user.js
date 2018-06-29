const _ = require('lodash'),
  express = require('express'),
  mongoose = require('mongoose'),
  globalFunctions = require('../globalFunctions/common'),
  github = require('github-api');

fetch = require('node-fetch'),
  userRouter = express.Router();

//import schema models
const User = require('../models/user');

// git user configuration




// --------------Required API begins




userRouter.get('/getInfo/:username', async (req, res) => {
  try {
    let validInputs = ['username'];
    let isValid = globalFunctions.requiredFields(req.params, validInputs);
    if (!isValid) {
      return res.status(400).json({
        message: 'Required fields missing'
      });
    }
    const githubData = await fetch(`https://api.github.com/users/${req.params.username}/repos`);
    const json = await githubData.json();
    let formData = {
      gitHubUsername: 'ugendarkumar',
      publicRepositories: []
    };
    for (let i = 0; i < json.length; i++) {
      let repData = {
        repoName: json[i].name,
        repoUpdatedDate: json[i].updated_at,
        repoCreatedDate: json[i].created_at,
        nodeId: json[i].node_id,
        id: json[i].id
      };
      formData.publicRepositories.push(repData);
    }
    let saveGitUser = await new User(formData).save()
    return res.status(200).json({
      data: saveGitUser
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// API to fetch and save searched users

userRouter.get('/getInfo/:username', async (req, res) => {
  try {
    let validInputs = ['username'];
    let isValid = globalFunctions.requiredFields(req.params, validInputs);
    if (!isValid) {
      return res.status(400).json({
        message: 'Required fields missing'
      });
    }
    const githubData = await fetch(`https://api.github.com/users/${req.params.username}/repos`);
    const json = await githubData.json();
    let formData = {
      gitHubUsername: 'ugendarkumar',
      publicRepositories: []
    };
    for (let i = 0; i < json.length; i++) {
      let repData = {
        repoName: json[i].name,
        repoUpdatedDate: json[i].updated_at,
        repoCreatedDate: json[i].created_at,
        nodeId: json[i].node_id,
        id: json[i].id
      };
      formData.publicRepositories.push(repData);
    }
    let saveGitUser = await new User(formData).save()
    return res.status(200).json({
      data: saveGitUser
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});





module.exports = userRouter;