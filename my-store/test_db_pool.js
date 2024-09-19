var mysql = require('mysql');
var pool = mysql.createPool({
    connectionlimit: 10, //ของ pool 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-store'
});

pool.query('SELECT * FROM packet', function(error, results, fields){
    if(error) throw error;

    console.log(results);
});