require('dotenv').config();
const mongoose = require('mongoose')

const mongoURL = process.env.MONGO_URL;
const mongoPort = process.env.MONGO_PORT;
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const databaseName = encodeURIComponent(process.env.MONGO_DATABASE);
const authDB = databaseName

const connectionURL = `mongodb://${username}:${password}@${mongoURL}:${mongoPort}/${databaseName}?authMechanism=SCRAM-SHA-1&authSource=${authDB}`

mongoose.connect(connectionURL).then(() => {
    console.log('Conexão com o banco realizada com sucesso!')
}).catch((e) => {
    console.log('Falha na conexão com o banco')
    console.log(e)
})


