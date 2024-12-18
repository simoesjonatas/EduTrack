const mongoose = require('mongoose')

const InstituicaoSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    uf: {
        type: String
    },
    qtdAlunos: {
        type: Number
    }

})

const Instituicao = mongoose.model('Instituicao', InstituicaoSchema, 'instituicoes')

module.exports = Instituicao