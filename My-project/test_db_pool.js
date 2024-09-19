var mysql = require('mysql');
var pool = mysql.createPool({
    connectionlimit: 10, //ของ pool 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-project'
});

pool.query('SELECT * FROM project01', function(error, results, fields){
    if(error) throw error;

    console.log(results);
});