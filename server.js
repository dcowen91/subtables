var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// var http = require('http')
// var port = process.env.PORT || 1337;
app.set('port', (process.env.PORT || 1337));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// http.createServer(function(req, res) {
// 	res.writeHead(200, { 'Content-Type': 'text/plain' });
// 	var responseString = "";
// 	for (var i = 0; i < _TeamNamesByIndex.length; i++)
// 	{
// 		var current = getResults(_TeamNamesByIndex[i]);
// 		var currentString = current.name + "\n"
// 							+ current.record.WIN + " wins, "
// 							+ current.record.DRAW + " draws,"
// 							+ current.record.LOSE + " losses\n"
// 							+ current.goals.GF + " for, "
// 							+ current.goals.GA + " against ("
// 							+  (current.goals.GF- current.goals.GA) + " GD)\n\n";
// 		responseString += currentString;
// 	}
// 	res.end(responseString);
// }).listen(port);
//git push azure master to deploy
//git push origin master to save