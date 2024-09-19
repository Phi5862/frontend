// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });






// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World by Express!')
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// });





// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World by Express!')
// });

// app.get('/users', (req, res) => {
//     res.send("Getting all users to you");
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// });





const express = require('express');
const app = express();
const port = 3000;

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionlimit: 10,  
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-store'
});

app.get('/', (req, res) => {
    res.send('Hello World by Express!')
});

app.get('/packet', (req, res) => {
    pool.query('SELECT * FROM packet', function(error, results, fields){
        if(error) throw error;
    
        res.json(results);
    });
});

app.get('/packet/:userId', (req, res) => {
    const userId = req.params.userId;
    pool.query('SELECT * FROM packet WHERE AccessoriesID = ?', [userId], function(error, results, fields){
        if(error) throw error;
    
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}); 