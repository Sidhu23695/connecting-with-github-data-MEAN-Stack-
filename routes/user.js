const _ = require('lodash'),
    express = require('express'),
    mongoose = require('mongoose'),
github = require('octonode'),
fetch = require('node-fetch'),
userRouter = express.Router();

//import schema models
const User = require('../models/user');

// git user configuration




// --------------Required API begins




userRouter.post('/getInfo', async(req, res) => {
try {
  const client = github.client({
    username: 'ugendarkumar',
    password: 'beast@9840'
  });

 client.get('/user', {}, async function (err, status, body, headers) {
       if(err) return res.status(500).json({message:'Internal server error'})

       console.log(body.repos_url)

let userInfoRep = await fetch(body.repos_url);

const json = await userInfoRep.json();
let formData = {gitHubUsername:'ugendarkumar',publicRepositories:[]};
console.log(json)
for(let i = 0; i < json.length; i++){
  let repData = {repoName:json[i].name,repoUpdatedDate:json[i].updated_at,
    repoCreatedDate:json[i].created_at,nodeId:json[i].node_id,id:json[i].id};
    formData.publicRepositories.push(repData);
}
let saveGitUser = await new User(formData).save()
return res.status(200).json({data:formData});
  })

}
catch(e) {
  console.log(e);
  return res.status(500).json({message:'Internal server error'});
}
});


// API to update user employment information (updating data in Employment schema)





module.exports = userRouter;
