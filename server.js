const http = require("http"); // import the http module, so that we can create a web server
const file = require("fs"); // import the fs (file system) module so that we read and write data to files
const url = require("url"); // import the url module so we can parse the web address of the request into readable parts

var games;

const host = "localhost"; // address of the server; localhost means that the server is referring to itself and is not accessible from the internet
const port = 8000; // port most commonly used by webservers

const server = http.createServer(processRequest);// create the server object

server.listen(port, host, () => { // Bind the port and host to the server
  console.log("Server is running!");
});

// process a request received, prepare and send a response back to the client
function processRequest(request, response){
  let queryObject = url.parse(request.url, true);

  if(request.url === "/index.html"){
    file.readFile('index.html', 'utf8', function(err, contents) {
			if(err){
				response.writeHead(500, { "Content-Type": "text/html"});
				response.end();
				return;
			}

			response.writeHead(200, { "Content-Type": "text/html"});
			response.end(contents);
		});
  }

  else if(request.url === "/stylesheet.css"){
    file.readFile('stylesheet.css', 'utf8', function(err, contents) {
			if(err){
				response.writeHead(500, { "Content-Type": "text/css"});
				response.end();
				return;
			}
			response.writeHead(200, { "Content-Type": "text/css"});
			response.end(contents);
		});
  }

  else if(request.url === "/js/js-code.js"){
    file.readFile('js/js-code.js', 'utf8', function(err, contents) {
      if(err){
        response.writeHead(500, { "Content-Type": "application/javascript"});
        response.end();
        return;
      }
      response.writeHead(200, { "Content-Type": "application/javascript"});
      response.end(contents);
    });
  }

  else if(request.url == "/js/games.json"){
    file.readFile('js/games.json', 'utf8', function(err, contents) {
      if(err){
        response.writeHead(500, {"Content-Type": "application/javascript"});
        response.end();
        return;
      }
      games = JSON.parse(contents);
      response.writeHead(200, {"Content-Type": "application/javascript"});
      response.end(contents);
    });
  }

  else if(request.method === "POST"){
    let data = "";

    request.on('data', chunk => {
        data += chunk.toString();
    });
    request.on('end', () => {
        queryObject = url.parse(data, true);

        // create a new student object
        let newGame = {
          title: queryObject.query.name,
          tone: "",
          type: "",
          subject: ""
        };

        // add the new student object to the students array
        games.push(newGame);

        // write the new object to the students.json file to save the data
        // send the new data back to the client
        file.writeFile('js/games.json', JSON.stringify(games), function (writeError) {
          if (writeError){
            console.log("There was an error writing to the students.json file.");
            throw err;
          }
          else {
            // read contents from the file again
            file.readFile('js/games.json', 'utf8', function(err, contents) {
        			if(err){
        				response.writeHead(500, {"Content-Type": "application/javascript"});
        				response.end();
        				return;
        			}
        			response.writeHead(200, {"Content-Type": "application/javascript"});
        			response.end(contents);
        		});
          }
        });
    });
  }

  else if(request.method === "PUT"){
    let data = "";
    console.log("PUTTING");

    request.on('data', chunk => {
        data += chunk.toString();
    });
    request.on('end', () => {
        queryObject = url.parse(data, true);

        for(i in games){
          if(games[i].title == queryObject.query.name){
            games[i].tone = queryObject.query.tone;
            games[i].type = queryObject.query.type;
            games[i].subject = queryObject.query.subject;
          }
        }

        // write the new object to the students.json file to save the data
        // send the new data back to the client
        file.writeFile('js/games.json', JSON.stringify(games), function (writeError) {
          if (writeError){
            console.log("There was an error writing to the students.json file.");
            throw err;
          }
          else {
            // read contents from the file again
            file.readFile('js/games.json', 'utf8', function(err, contents) {
        			if(err){
        				response.writeHead(500, {"Content-Type": "application/javascript"});
        				response.end();
        				return;
        			}
        			response.writeHead(200, {"Content-Type": "application/javascript"});
        			response.end(contents);
        		});
          }
        });
    });
  }
}

// run the server: node server.js
// if you make a change to your server code, you must restart the server
