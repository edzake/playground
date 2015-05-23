// by Zake

var http = require('http');
var request = require('request');
var str = "";

var url = "http://pferdeherde.informatikerstrich.de";
//var qs = require('querystring');

//var url ="http://www.spiegel.de/";

function strStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

function webserverDoWeLaterYAAY() {
	http.createServer(function (req, res) {
	  res.writeHead(200, {
	    'Content-Type': 'text/html'
	  });

	  if (req.url === "/") {
	  	req.url = url;
	  }

	  var tmp = "" + req.url;

	  if (strStartsWith(tmp,"/")) {
	  	req.url = url + req.url;
	  }

	  console.log("URL:" + req.url);

	  doRequest(url);

	  // Problem = Die Custom CSS
	  var contents = 
	  	str .replace(/soup.io/g, "localhost:3000")
	  		.replace(/href=\"\/(\w.*)\"/g, "href=\"http://localhost:3000/$1\"")
	  		.replace(/src=\"\\/g, "src=\"" + url);

	  res.write(contents);
	  res.end();
	}).listen(3000);
}

function doRequest(location) {
    request({
      followAllRedirects: false,
      timeout: 5000, // five seconds
      url:location
    }, function (error, response, body) {
        str = response.body;
        console.log("ERROR:" + error);
    }).on("complete", function(response) {
      if(!response.complete) setImmediate(function() {
         doRequest(location);
      });
    });
}

console.log("*** Webserver");
webserverDoWeLaterYAAY();
//doRequest("http://pferdeherde.informatikerstrich.de/");