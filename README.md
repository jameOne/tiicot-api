# tiicot-api-server

An express server interfacing with mongoDB Atlas.

# Run

In order to run this portion of the exam, you can execute:
``source ./start.sh`` from the root project directory. This command will
compile the TypeScript and start the node.js server. 

Alternatively you should be able to run:
``tsc && node ./bin/www`` from the
project root.

# Docker

To build the container execute: 
``docker build . -t tiicot-api:latest``

Then to run enter:
``docker run -p 3000:3000 tiicot-api``

*Note these commands have been tested only on Ubuntu 18 LTS.
