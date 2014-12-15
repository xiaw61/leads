var express = require('express')
var bodyParser = require('body-parser');
var fs  = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var getLeads = function (req, res) {
	console.log("test get start");
	fs.readFile('leadsData','utf8',function (err,data) {
  		if (err) {
    		return console.log(err);
  		}
  		var test = data.split('\n');
  		console.log( test  );
  		console.log( JSON.parse(test[5])  );


	});
	res.send('post success');
}

var update = function(req, res) {
	console.log("test post start");
	var name = req.body.name;
	var ip = req.body.ip;
	var email = req.body.email;
	console.log(name);
	console.log(ip);
	console.log(email);

	var lead = {
		userName :name,
		userIp :ip,
		userEmail:email 
	}
	

	fs.appendFile('leadsData',JSON.stringify(lead)+'\n',function(err) {
		if (err) return console.log(err);
        console.log('data saved');
	});
	res.send('post success');
}

app.post('/', update )

app.get('/', getLeads )

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Leads listening at http://%s:%s', host, port)

})