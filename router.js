var file = require("fs");
const express = require('express');
const path = require('path');
let router = express.Router();
const app = express();

app.use(express.json());

router.get("/", function(req, res, next){
	if(req.accepts('text/html')){
		if (file.existsSync("public/index.html")) {
			res.status(200);
			res.sendFile(path.join(__dirname, '/public/' + "index.html"));
		} else {
			res.status(404).send();
		}
	}
});

router.get("/index", function(req, res, next){
	if(req.accepts('text/html')){
		if (file.existsSync("public/index.html")) {
			res.status(200);
			res.sendFile(path.join(__dirname, '/public/' + "index.html"));
		} else {
			res.status(404).send();
		}
	}
});

module.exports = router;
