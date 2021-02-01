const express = require('express');
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

//Obtener usuarios 
app.get('/', (req, res) => {

    //Limites para buscar usuarios desde la url con parametros
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Buscar usuario
 Usuarios.find({})
 .skip(desde)
 .limit(limite)
 .exec((err, usuarios) => {
     if(err){
         res.status(400).json({
             ok:false, 
             err
         })
     }

     res.json({
         ok: true,
         usuarios
     })
 })
});

//Almacenar usuarios
app.post('/usuarios', (req, res) => {

    let body = req.body;

    let usuarios = new Usuarios({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        google: body.google,
        estado: body.estado
    });

  usuarios.save((err, usuarioDB) => {
      if(err){
          res.status(400).json({
              ok:false, 
              err
          });
      }

      res.json({
          ok:true,
          usuario: usuarioDB
      })
  })

});

//Actualizar usuarios
app.put('/usuarios/:id', (req, res) => {
   
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'estado']);

    Usuarios.findByIdAndUpdate(id, body, {new: true, runValidators:true}, (err, usuarioDB) => {
        if(err){
            res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            usuarioDB
        })
    })
});

//Eliminar usuarios 
app.delete('/usuarios/:id', (req, res) => {
    let id = req.params.id;

    let estadoCambiado = {
        estado:false
    }
    /*
//Cambiar estado a falso no eliminar usuario
    Usuarios.findOneAndUpdate(id, estadoCambiado, {new:true},  (err, usuarioActualizado) => {
        if(err){
            res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            usuarioActualizado
        })
    })

    */


//Funcion para eliminar usuario de la base de datos

Usuarios.findByIdAndRemove(id, (err, usuarioBorrado) => {

    if(err){
        res.status(400).json({
            ok:false,
            err
        })
    }

    res.json({
        ok:true,
        usuarioBorrado

    })


})
})


module.exports = app;