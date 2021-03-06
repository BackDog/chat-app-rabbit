'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('A client connected');
    ws.on('message', function(message) {
       wss.clients.forEach((client) => {
           client.send(message);
       });
    });
  
    ws.on('close', () => function () {
      console.log('A client disconnected');
    });
});
setInterval(function() { 
    wss.clients.forEach((client) => {
        client.send(JSON.stringify({}));
    }); 
}, 1000);
