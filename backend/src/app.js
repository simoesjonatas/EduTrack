const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Conexão do banco de dados
require('./db/mongoose')

// Importando arquivo de rotas
const healthyRouter = require('./routers/healthy')
const instituicoesRouter = require('./routers/instituicoes')

const app = express()

// Criando o parser de json (as requisições chegam e vão como objetos JSON)
const jsonParser = bodyParser.json({
    limit: "50mb"
})

// Habilitando CORS e Transformando objeto recebido em JSON
app.use(cors())
app.use(jsonParser)

// Altere a porta se necessário
const port = 1713 

// Aplicando rotas ao Express
app.use(healthyRouter)
app.use('/instituicoes', instituicoesRouter)

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`)
})