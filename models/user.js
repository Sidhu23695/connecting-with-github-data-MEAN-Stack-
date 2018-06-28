const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//create a schema
const userSchema = new Schema({
    gitHubUsername: {
     type:String,
     trim:true
    },
   publicRepositories:[{repoName:{type:String,trim:true},nodeId:String,id:String,repoUpdatedDate:Date,repoCreatedDate:Date}]
}, {
    timestamps: true
});

//create the model
const userDataModel = mongoose.model('User', userSchema);

//export the model
module.exports = userDataModel;
