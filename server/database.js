const mysql = require('mysql');


//Credenciales MySQL
const connection = mysql.createConnection({
    host: "masterclassiot.ga",
    user: "admin_datos",
    password: "121212",
    database: "admin_datos"
});

connection.connect(function(err) {
    if (err) throw err;

    //una vez conectados, podemos hacer consultas.
    console.log("Conexión a MYSQL exitosa!!!")
});


//para mantener la sesión con mysql abierta
setInterval(function() {
    var query = 'SELECT 1 + 1 as result';

    connection.query(query, function(err, result, fields) {
        if (err) throw err;
    });

}, 5000);

module.exports = connection;