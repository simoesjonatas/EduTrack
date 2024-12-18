import React, { useState } from 'react';
import './FormInstituicao.css';

const FormInstituicao = ({ formData, onChange }) => {
    // manipulacao customizada para o campo UF
    const handleUfChange = (e) => {
        const { name, value } = e.target;
        // aceita apenas letras e limita a 2 caracteres
        const formattedValue = value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2);
        onChange({ target: { name, value: formattedValue } });
    };

    // manipulacao customizada para o campo quantidade de alunos
    const handleQtdAlunosChange = (e) => {
        const { name, value } = e.target;
        // aceita apenas numeros positivos
        const formattedValue = value.replace(/[^0-9]/g, ''); // remove caracteres nao num
        onChange({ target: { name, value: formattedValue } });
    };

    return (
        <form>
            <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={onChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="uf">UF:</label>
                <input
                    type="text"
                    id="uf"
                    name="uf"
                    value={formData.uf}
                    onChange={handleUfChange}
                    className="form-control"
                    maxLength={2}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="qtdAlunos">Quantidade de Alunos:</label>
                <input
                    type="number"
                    id="qtdAlunos"
                    name="qtdAlunos"
                    value={formData.qtdAlunos}
                    onChange={handleQtdAlunosChange}
                    className="form-control"
                    min="1"
                    required
                />
            </div>
        </form>
    );
};

export default FormInstituicao;
