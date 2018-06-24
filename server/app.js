const express = require("express");
const proxy = require('express-http-proxy');
const app = express();

app.use('/api', proxy('https://secim-api.adilsecim.net'));

app.listen(80);