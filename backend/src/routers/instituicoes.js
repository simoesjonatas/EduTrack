// Rotas para o CRUD de Instituições
const express = require('express')
const router = new express.Router()
const Instituicoes = require('../models/Instituicoes')

// Lista todas as Instituições
router.get('/', async (req, res) => {

    const list = await Instituicoes.find({})
    res.status(200).send(list)

})

// cria uma instituicao
router.post('/', async (req, res) => {
    try {
        let { nome, uf, qtdAlunos } = req.body;

        // validacao basica dos campos
        if (!nome || !uf || qtdAlunos === undefined) {
            return res.status(400).send({ error: 'Todos os campos são obrigatórios.' });
        }

        // converter qtdAlunos para numero inteiro
        qtdAlunos = parseInt(qtdAlunos, 10);

        // validacao para UF (somente 2 letras maiusculas)
        const ufRegex = /^[A-Z]{2}$/;
        if (!ufRegex.test(uf)) {
            return res.status(400).send({ error: 'UF deve conter exatamente 2 letras maiúsculas.' });
        }

        // Validacao para quantidade de alunos (numero positivo)
        if (!Number.isInteger(qtdAlunos) || qtdAlunos <= 0) {
            return res.status(400).send({ error: 'Quantidade de Alunos deve ser um número inteiro positivo.' });
        }


        // criar instituicao
        const novaInstituicao = new Instituicoes({ 
            nome: nome, 
            uf: uf, 
            qtdAlunos: qtdAlunos 
        });

        await novaInstituicao.save();

        res.status(201).send(novaInstituicao);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao criar instituição.' });
    }
});


// editar uma instituicao
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let { nome, uf, qtdAlunos } = req.body;

        // Verifica se a instituição existe
        const instituicao = await Instituicoes.findById(id);
        if (!instituicao) {
            return res.status(404).send({ error: 'Instituição não encontrada.' });
        }

        // Validação dos campos
        if (nome) instituicao.nome = nome;

        if (uf) {
            const ufRegex = /^[A-Z]{2}$/;
            if (!ufRegex.test(uf)) {
                return res.status(400).send({ error: 'UF deve conter exatamente 2 letras maiúsculas.' });
            }
            instituicao.uf = uf;
        }

        if (qtdAlunos !== undefined) {
            qtdAlunos = parseInt(qtdAlunos, 10);
            if (!Number.isInteger(qtdAlunos) || qtdAlunos <= 0) {
                return res.status(400).send({ error: 'Quantidade de Alunos deve ser um número inteiro positivo.' });
            }
            instituicao.qtdAlunos = qtdAlunos;
        }

        // Salva as alterações
        await instituicao.save();
        res.status(200).send(instituicao);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao editar instituição.' });
    }
});


// excluir uma instituicao
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se a instituição existe
        const instituicao = await Instituicoes.findById(id);
        if (!instituicao) {
            return res.status(404).send({ error: 'Instituição não encontrada.' });
        }

        // Remove a instituição
        await Instituicoes.findByIdAndDelete(id);
        res.status(200).send({ message: 'Instituição excluída com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao excluir instituição.' });
    }
});



// rota para agregar dados apenas pelo UF
router.get('/aggregate', async (req, res) => {
    try {
        const aggregationResult = await Instituicoes.aggregate([
            {
                $group: {
                    _id: "$uf",
                    qtdAlunos: { $sum: "$qtdAlunos" }
                }
            },
            {
                $project: {
                    _id: 0,         // remover o campo _id padrão
                    uf: "$_id",     // renomear o campo agrupado para 'uf'
                    qtdAlunos: 1    // manter a soma de qtdAlunos
                }
            }
        ]);

        res.status(200).json(aggregationResult);
    } catch (error) {
        console.error('Erro ao agregar dados:', error);
        res.status(500).json({ error: 'Erro ao agregar dados.' });
    }
});

module.exports = router