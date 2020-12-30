const express = require('express');
const app = express();

app.use(require('./opinion'));

module.exports = app;