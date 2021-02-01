require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(require('./rutas/rutas'));

mongoose.connect('mongodb://localhost:27017/usuarios-prueba', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err) throw err;

    console.log('Base de datos ONLINE!!!');
})

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
})