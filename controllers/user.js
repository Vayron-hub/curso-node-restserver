const { response, request } = require('express');


const usuariosGet  = (req, res = response) => {

    const {q,nombre = 'No Name',apkey}= req.query;

    res.json({
        msg: 'get APi - controlador',
        q,
        nombre,
        apkey
    })
}

const usuariosPost  = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post APi - controlador',
        body
    })
}

const usuariosPut  = (req, res = response) => {
    
    const { id } = req.params;

    res.json({
        msg: 'put APi - controlador',
        id
    })
}

const usuariosPatch  = (req, res = response) => {
    res.json({
        msg: 'patch APi - controlador'
    })
}

const usuariosDelete  = (req, res = response) => {
    res.json({
        msg: 'delete APi - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}