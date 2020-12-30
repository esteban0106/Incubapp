const express = require('express');
const app = express();
const connection = require('../database');


//SE REALIZA LA CONSULTA DE TODAS LAS CLASIFICACIONES HECHAS HASTA EL MOMENTO
app.get('/calificaciones', function(req, res) {
    connection.query('SELECT * FROM calificaciones', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//CONSULTA UNA OPINION ESPECIFICA CON AYUDA DEL ID
app.get('/calificaciones/:id', function(req, res) {

    let id = req.params.id;

    connection.query('SELECT * FROM calificaciones WHERE id_calificaciones = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//REALIZA UNA CONSULTAS DE OPINIONES CON LA AYUDA DE LA FECHA
app.get('/calificaciones/:fecha', function(req, res) {

    let date = req.params.fecha;

    connection.query('SELECT * FROM calificaciones WHERE fecha_calificaciones LIKE ?*', [date], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// AGREGA UNA OPINION A LA BASE DE DATOS
app.post('/calificaciones', function(req, res) {

    let { origen, opinion, calificacion } = req.body;
    var sql = "INSERT INTO calificaciones (origen_calificaciones, opinion_calificaciones, valor_calificaciones) VALUES (?)";
    var values = [origen, opinion, calificacion];
    connection.query(sql, [values], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

//REALIZA UNA BUSQUEDA EN LA BASE DE DATOS DE ACUERDO CON VALOR DE LA CLASIFICACION
app.get('/calificaciones/buscar/:termino', function(req, res) {

    let termino = req.params.termino;
    connection.query('SELECT * FROM calificaciones WHERE  valor_calificaciones > ?', [termino], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// ACTUALIZA LOS DATOS DE OPINION Y VALOR DE CLASIFICACION
app.put('/calificaciones/:id', function(req, res) {

    let id = req.params.id;
    let { opinion, calificacion } = req.body;
    connection.query('UPDATE calificaciones SET opinion_calificaciones = ?,valor_calificaciones = ? WHERE id_calificaciones = ?', [opinion, calificacion, id], (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// ELIMINA UNA FILA DE LA BASE DE DATOS, DE ACUERDO AL ID DIGITADO
app.delete('/calificaciones/:id', function(req, res) {
    let id = req.params.id;

    connection.query('DELETE FROM calificaciones WHERE id_calificaciones=?', [id], (err, rows) => {
        if (!err) {
            res.json(`Empresa con el ID = ${id} a sido eliminada`);
        } else {
            console.log(err);
        }
    });
});





module.exports = app;