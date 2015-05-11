// Declare our dependencies.
var http = require('http');
var url  = require('url');
var path = require('path');
var fs   = require('fs');

// The function we run on every incoming message
var serverCallback = function(incomingMessage, response) {

  // Get the location of our file
  var file = path.join(process.cwd(), url.parse(incomingMessage.url).pathname);

  // Attempt to open our file
  fs.open(file, 'r', function(error) {

    // If the file doesn't exist on our server, send a 404 response
    if(error) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404 Not Found\n');
      response.end();
      return;
    }

    // If the requested file is a directory, append our index.html
    if(fs.statSync(file).isDirectory()) {
      file += 'index.html';
    }

    // Read our file
    fs.readFile(file, function(error, fileText) {

      // If there's an error, we have an error!  Send back a 500 response.
      if(error) {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(error + "\n");
        response.end();
        return;
      }

      // Send back a 200 response with the requested data.
      response.writeHead(200);
      response.write(fileText);
      response.end();
    });
  });
};

// Set our port number
var port = process.argv[2] || 3000;

// Start our server using the serverCallback function
var server = http.createServer(serverCallback);

// Have our server listen to requests at our specified port
server.listen(port);

// Log out to our console, so we know where our server is running!
console.log("Server running at: http://localhost:" + port);
