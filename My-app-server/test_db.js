var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-product'
});

connection.connect();

connection.query('SELECT * FROM users', function(error, results, fields){
    if(error) throw error;

    console.log(results);
});

connection.end();