## Overview
A simple application showcasing Firebase auth and Firestore.
The client is build using ReactJS and the server using NodeJS + Express.

## Installation
1. Copy 'serviceAccountKey.json' into 'server' folder
2. Copy 'firebaseConfig.js' into 'client/src' folder
3. Make sure Docker and docker-compose are installed in the system\n
    https://docs.docker.com/get-docker/
    https://docs.docker.com/compose/install/
4. Run 'docker-compose up -d' in the root project folder
5. Navigate to "http://localhost:3000/" to use the application

### Running without Docker & docker-compose
1. Follow steps 1 & 2 from above
2. Install the latest version of Node (tested with v15)
3. Install react scripts using 'npm install react-scripts@4.0.3 -g'
4. Navigate to 'server' folder and run 'npm i' to install all dependencies
5. Navigate to 'client' folder and run 'npm i' to install all dependencies
6. Run the server using 'export NODE_PORT=5000 && node index.js'
7. Run the client using 'npm start'
8. Navigate to 'localhost:3000' to use the application.

#### Note
You can generate a build of the client using 'npm run build'