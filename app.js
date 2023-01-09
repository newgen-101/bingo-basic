const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');

app.listen(3000, () => {
	console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended :true}))

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.post("/settle.html", (req, res) => {
	var aleo_script = "aleo run transfer_token \'{owner: aleo10z520frfeahvcafyv57pd3ff6g8utw5vzmrj9fm0nptyxwrtfyys5734zw.private,gates: 0u64.private,amount: 1200u64.private,_nonce: 6934474382211238346959157859170067476549430160014390010062899352912666199499group.public}\' aleo182cerh4lym9a628npmtt7dmrsm3892ppdz897uwc4lqa9vcazs9sgrnqhm 100u64"
	var script_to_run = aleo_script + " > output.txt"

	const{ spawn } = require('child_process');
	const child = spawn(script_to_run,{cwd:'/home/newgen_expedition/examples/token', shell: true}).on('error', function( err ){ throw err });
	var data_send = "";
	function sleep(millis) {
	  return new Promise(resolve => setTimeout(resolve, millis));
	}
	sleep(60000).then(() => {
		try {
		  const data = fs.readFileSync('/home/newgen_expedition/examples/token/output.txt', 'utf8');
		  console.log(data);
				data_send = data_send + data;
		} catch (err) {
		  console.error(err);
		}
	const response = "<html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><link rel='stylesheet' href='app.css'><link rel='stylesheet'  href='//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css'><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD' crossorigin='anonymous'><title>response</title></head><body><nav class='navbar navbar-light bg-light'><span class='navbar-brand mb-0 h1'>Aleo BingoFi</span></nav></body></html>" + data_send + "<div class='row' style='margin: auto; text-align: center;'><div class='col-md-8'></div><form action='http://130.211.202.185:3000/landing.html'><input type='submit' class='btn btn-info' value='Go to Game :)' /></form></div>"
	res.send(response);
	
	});
});

app.post("/settle_1.html", (req, res) => {
	var aleo_script = "aleo run transfer_token \'{owner: aleo182cerh4lym9a628npmtt7dmrsm3892ppdz897uwc4lqa9vcazs9sgrnqhm.private, gates: 0u64.private,amount: 600u64.private,_nonce: 6934474382211238346959157859170067476549430160014390010062899352912666199499group.public}\' aleo10z520frfeahvcafyv57pd3ff6g8utw5vzmrj9fm0nptyxwrtfyys5734zw 100u64"
	var script_to_run = aleo_script + " > output.txt"

	const{ spawn } = require('child_process');
	const child = spawn(script_to_run,{cwd:'/home/newgen_expedition/examples/token_1', shell: true}).on('error', function( err ){ throw err });
	var data_send_1 = "";
	function sleep(millis) {
	  return new Promise(resolve => setTimeout(resolve, millis));
	}
	sleep(60000).then(() => {
		try {
		  const data = fs.readFileSync('/home/newgen_expedition/examples/token_1/output.txt', 'utf8');
		  console.log(data);
				data_send_1 = data_send_1 + data;
		} catch (err) {
		  console.error(err);
		}
const response = "<html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><link rel='stylesheet' href='app.css'><link rel='stylesheet'  href='//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css'><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD' crossorigin='anonymous'><title>response</title></head><body><nav class='navbar navbar-light bg-light'><span class='navbar-brand mb-0 h1'>Aleo BingoFi</span></nav></body></html>" + data_send_1 + "<div class='row' style='margin: auto; text-align: center;'><div class='col-md-8'></div><form action='http://130.211.202.185:3000/landing.html'><input type='submit' class='btn btn-info' value='Go to Game :)' /></form></div>"
		res.send(response);
	//const word = "output"
		//res.sendFile(__dirname +"/response.html",{data:data_send_1});
	
	//res.redirect('/');
	
	});
});
