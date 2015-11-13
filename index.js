// When it runs (cron job)
// Every month or so

// Spits out an e-mail providing stats

// Postmarkapp.com for testing
// +177 Git Clones
// +2,149 views of the project 
// +30+ requests for engagement
// +3000+ Commits
// +30+ Contributors

var express = require('express');
//var http = require('http');
// var github = require('octonode');
// var jelly = client.repo('projectjellyfish/api')
var request = require('request-promise');
// var bodyParser = require('body-parser');

var app = express();
// app.use(bodyParser.json());

function Options(url) {
  this.uri = 'https://api.github.com/repos/projectjellyfish/api/stats/' + url,
  this.headers = {
        'User-Agent': 'Request-Promise',
        'Authorization': 'token fdce17e28254526a9958b277988822957ed5f028'
    },
  this.json = true // Automatically parses the JSON string in the response 
}

var contributorOption = new Options('contributors') 
var participationOption = new Options('participation') 

var contributor = {
  all: 0,
  month: 0
};
request(contributorOption)
  .then(function(stats){
    time = Math.floor(Date.now() / 1000) - (86400 * 28)
    contributor.all = stats.length;
    stats.forEach(function(user){
      //Determine if user has any commits in the last 4 weeks
      user = user.weeks.slice(-4)
      commits = user.reduce(function(a,b){
        return a+b['c']
      }, 0)
      if (commits > 0) {
        contributor.month++
      }
    })
    console.log('all contributor :' + contributor.all + ' month contributor: ' + contributor.month)    
  })
  .catch(function(err){
    console.log(err)
  })

var commits = {};
request(participationOption)
  .then(function(stats){
    commits.all = stats.all.reduce( function(a, b){
      return a + b;
    })
    statsMonth = stats.all.slice(-4)
    commits.month = statsMonth.reduce( function(a, b){
      return a + b;
    })
    console.log('all commits :' + commits.all + ' month commits: ' + commits.month)    
  })
  .catch(function(err){
    console.log(err)
  })


