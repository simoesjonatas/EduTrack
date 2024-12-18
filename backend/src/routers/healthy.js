// Rotas para verificar se a API está funcionando
const express = require('express')
const router = new express.Router()

// Retorna um string indicando que o servidor está funcionando
router.get('/', async (req, res) => {

    res.status(200).send("healthy!")

})

module.exports = router