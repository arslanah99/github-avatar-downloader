var request = require('request');
var getToken = require('./secrets')
var fs = require('fs');

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

  function downloadImageByURL(url, filePath){
    request.get(url).pipe(fs.createWriteStream(filePath));
    }

  
  getRepoContributors("jquery", "jquery", function(err, result) {
   var userArray = JSON.parse(result);
   for(var user of userArray){
     downloadImageByURL(user.avatar_url, 'avatars/' + user.login + '.jpg')
   }
  }
  );

console.log('Welcome to the GitHub Avatar Downloader!');