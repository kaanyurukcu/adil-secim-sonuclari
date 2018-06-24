const express = require("express");
const proxy = require('express-http-proxy');
const path = require('path');
const app = express();

console.log(path.join(__dirname, 'client/build'));

app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use('/api', proxy('https://secim-api.adilsecim.net'));

app.listen(process.env.PORT || 80);