var request = require('request');
var getToken = require('./secrets')

function getRepoContributors(repoOwner, repoName, cb) {
    var options ={
    url :'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
        'User-Agent' : getToken//REMEBER THIS LINE
    }
}

    request(options, function(err, res, body){
        cb(err, body)
    })
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
   var newObj = JSON.parse(result);
   newObj.forEach(element =>{
       console.log(element.login, element.avatar_url)
   })
    console.log("Errors:", err);
    console.log("Result:", result);
  });

console.log('Welcome to the GitHub Avatar Downloader!');