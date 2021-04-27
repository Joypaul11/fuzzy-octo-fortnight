require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.NODE_PORT;

if(!port) {
    console.error('Environment not set!');
    process.exit(1);
}

// app.get('/', async(req, res) => {
//     return res.status(200).json('Hello from server!');
// });

const router = express.Router();
const routes = require('./api/routeImports');
app.use('/', routes(router));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;