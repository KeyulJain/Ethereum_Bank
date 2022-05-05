var express = require('express');
var path = require('path');
var app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, './public/')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.listen(port, ()=>{
    console.log(`Listening on port http://localhost:${port}`);
});