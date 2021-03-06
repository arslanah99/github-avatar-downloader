//all required variables
var request = require("request");
var getToken = require("./secrets");
var fs = require("fs");
var owner = process.argv[2];
var repoName = process.argv[3];

//added ability to select any repo in github
function getRepoContributors(owner, repoName, cb) {
  var options = {
    url:
      "https://api.github.com/repos/" +
      owner +
      "/" +
      repoName +
      "/contributors",
    headers: {
      "User-Agent": getToken //REMEBER THIS LINE
    }
  };


  request(options, function(err, res, body) {
    cb(err, body);
  });
}

//grabbing the github avatar images
function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
}
//adding the images to folder and making an err if the repo or owner is invalid
getRepoContributors(owner, repoName, function(err, result) {
  var userArray = JSON.parse(result);
  if (owner === undefined || repoName === undefined) {
    console.log("Invalid");
  } else {
    for (var user of userArray) {
      downloadImageByURL(user.avatar_url, "avatars/" + user.login + ".jpg");
    }
  }
});

console.log("Welcome to the GitHub Avatar Downloader!");
