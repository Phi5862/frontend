var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-store'
});

connection.connect();

connection.query('SELECT * FROM packet', function(error, results, fields){
    if(error) throw error;

    console.log(results);
});

connection.end();