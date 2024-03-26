const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.js');


const usuariosGet = async (req = request, res = response) => {

    //const { q, nombre = 'No name', apkey } = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const contarLosActivos = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(contarLosActivos),
        Usuario.find(contarLosActivos)
            .skip(desde)
            .limit(limite)
    ]);

    res.json({
       total,
       usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    try {
        const { nombre, correo, password, rol } = req.body;
        const usuario = new Usuario({ nombre, correo, password, rol });

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //Guardar en DB
        await usuario.save();

        res.json({
            msg: 'post APi - controlador',
            usuario
        });
    } catch (e) {
        res.status(500).send({ mensaje: e });
    }
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //Validar contra DB
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);



    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch APi - controlador'
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //FISICAMENTE LO BORRAMOS
    // const usuario = await Usuario.findByIdAndDelete( id );

    //CAMBIAR ESTADO DEL USUARIO
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );

    res.json({
        id,
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}