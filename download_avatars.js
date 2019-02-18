var request = require('request');
var getToken = require('./secrets')

function getRepoContributors(repoOwner, repoName, cb) {
    var options ={
    url :'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
        'User-Agent' : 'request'//REMEBER THIS LINE
    }
}

    request(url, function(err, res, body){
        cb(err, body)
    })
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });

console.log('Welcome to the GitHub Avatar Downloader!');