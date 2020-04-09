const express = require('express');

let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

// READD ALL categoria
app.get('/categoria', (req, res) => {

    Categoria.find({  })
             .sort('descripcion')
             .populate('usuario', 'nombre email')
             .exec((err, categorias) => {
                
                if ( err ) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    categorias
                })
             });
});

// READ catergoria BY ID
app.get('/categoria/:id', verificaToken ,(req, res) => {
    //findById
    let id = req.params.id;

    Categoria.findById( id, (err, categoriaDB) => {
        
        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if ( !categoriaDB ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es válido.'
                }
            });
        }
        
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
    .populate('usuario', 'nombre email');
    
});

// CREATE categoria
app.post('/categoria', [verificaToken, verificaAdminRole] ,(req, res) => {
    // return categoria
    // req.usuario._id
    
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save( (err, categoriaDB) => {
        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if ( !categoriaDB ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.put('/categoria/:id', verificaToken ,(req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descpCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate( id, descpCategoria, { new: true, runValidators: true } ,(err, categoriaDB) => {
        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if ( !categoriaDB ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
});

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    // JUST ADMIN_ROLE delete categoria
    // findByIdAndRemove
    let id = req.params.id;

    Categoria.findByIdAndRemove( id, (err, categoriaDB) => {
        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if ( !categoriaDB ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada con éxito.'
        });
    }); 
});

module.exports = app;