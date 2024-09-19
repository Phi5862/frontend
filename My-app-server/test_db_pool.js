var mysql = require('mysql');
var pool = mysql.createPool({
    connectionlimit: 10, //ของ pool 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-product'
});

pool.query('SELECT * FROM users', function(error, results, fields){
    if(error) throw error;

    console.log(results);
});