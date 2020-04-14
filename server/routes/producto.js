const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

// GET all 
app.get('/producto', verificaToken ,(req, res) => {
    // read all productos
    // populate: usuario categoria
    // paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({disponible: true})
            .skip(desde)
            .limit(5)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec( ( err, productosDB ) => {
                if ( err ) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });                    
                }

                res.json({
                    ok: true,
                    producto: productosDB
                })
            });
                
});

// GET by ID
app.get('/producto/:id', verificaToken , (req, res) => {
    // populate: usuario categoria

    let id = req.params.id;

    Producto.findById( id )
                .populate('categoria', 'descripcion')
                .populate('usuario'  , 'nombre email')
                .exec( (err, productoDB) => {
                    if ( err ) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }
            
                    if ( !productoDB ) {
                        return res.status(400).json({
                            ok: false,
                            err: {
                                message: 'El ID no es válido.'
                            }
                        });
                    }
                    
                    res.json({
                        ok: true,
                        producto: productoDB
                    });
                });
    

});

app.get('/producto/buscar/:termino', verificaToken, ( req,res ) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');
    
    Producto.find({ nombre: regex })
            .populate('categoria', 'nombre')
            .exec(( err, productosDB) => {
                if ( err ) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
        
                if ( !productosDB ) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'El Termino no es válido.'
                        }
                    });
                }

                res.json({
                    ok: true,
                    producto: productosDB
                });
            });
});

// POST producto
app.post('/producto', verificaToken, (req, res) => {
    // post usuario
    // post categoria
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save( ( err, productoDB ) => {
        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            }); 
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    })

});

// PUT productp
app.put('/producto/:id', verificaToken ,(req, res) => {
    // post usuario
    // grabar una categoria del listado
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, ( err, productoDB ) => {
        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            }); 
        }

        if ( !productoDB ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe.'
                }
            }); 
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.disponible = body.disponible;
        productoDB.categoria = body.categoria;

        productoDB.save( ( err, productoSV ) => {
            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                }); 
            }

            res.json({
                ok: true,
                producto: productoSV
            });
        });
    });

});

// DELETE productp
app.delete('/producto/:id', verificaToken ,(req, res) => {
    // update disponible: false
    let id = req.params.id;

    Producto.findById( id,  (err, productoDB) => {
        if ( err ) {
            return res.status(500).json({
                ok: false,
                err
            }); 
        }

        if ( !productoDB ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe.'
                }
            }); 
        }

        productoDB.disponible = false;
        productoDB.save( ( err, productoDL ) => {
            if ( err ) {
                return res.status(500).json({
                    ok: false,
                    err
                }); 
            }

            res.json({
                ok: true,
                producto: productoDL,
                message: 'Producto borrado.'
            });
        });

    });
    
});

module.exports = app;