// node index.js server start
// npm run dev for nodemon
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true });

// App Setup
// Logging framework used for debugging
app.use(morgan('combined'));
app.use(cors());
// Any incomming request parsed as JSON
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.PORT || 3001;
// Creates a http server and forward to express app
const server = http.createServer(app);
// Once server created listen to the port
server.listen(port);
console.log('Server listening on port', port);
