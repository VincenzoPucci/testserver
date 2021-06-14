/*var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./signkey.key', 'utf8');
var certificate = fs.readFileSync('./signcert.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};*/
const express = require('express');
var cors = require('cors')
const path = require('path');
const routes = require('./routes');

const root = './';
const port = process.env.PORT || '3000';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(root, 'dist/angular-cosmosdb')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile('Inspectia/dist/angular-cosmosdb/index.html', {root});
});
app.listen(port, () => console.log(`API running on localhost:${port}`));


/*var server = https.createServer(credentials, app);
server.listen(port, () => console.log(`API running on localhost:${port}`));*/
