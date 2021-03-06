require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

const port = process.env.NODE_PORT;

if(!port) {
    console.error('Environment not set!');
    process.exit(1);
}

const router = express.Router();
const routes = require('./api/routeImports');
app.use('/', routes(router));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;