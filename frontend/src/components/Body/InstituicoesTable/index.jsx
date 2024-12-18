import React, { useEffect, useState } from 'react';
import backendUrl from '../../../utils/backend-url';
import axios from 'axios';
import { useTable } from 'react-table';
import { Modal, Button } from 'react-bootstrap';
import FormInstituicao from '../FormInstituicao';
import './index.css';

const InstituicoesTable = ({ refreshData, onRefresh }) => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedInstituicao, setSelectedInstituicao] = useState(null);

    // funcao para carregar os dados da tabela
    const fetchData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/instituicoes`);
            setData(response.data);
        } catch (error) {
            console.error('Erro ao buscar as instituições:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshData]);

    // funcao para editar
    const handleEdit = (instituicao) => {
        setSelectedInstituicao(instituicao);
        setShowModal(true);
    };

    // funcao para salvar alteracoes
    const handleSaveEdit = async () => {
        try {
            const url = `${backendUrl}/instituicoes/${selectedInstituicao._id}`;
            await axios.put(url, selectedInstituicao);
            setShowModal(false);
            fetchData(); // recarrega a tabela
            if (onRefresh) onRefresh(); // notifica o componente pai
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };

    // funcao para excluir
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/instituicoes/${id}`);
            fetchData(); // recarrega a tabela
            if (onRefresh) onRefresh(); // notifica o componente pai
        } catch (error) {
            console.error('Erro ao excluir a instituição:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setSelectedInstituicao((prev) => ({ ...prev, [name]: value }));
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'UF', accessor: 'uf' },
            { Header: 'Qtd Alunos', accessor: 'qtdAlunos' },
            {
                Header: 'Editar',
                Cell: ({ row }) => (
                    <button
                        onClick={() => handleEdit(row.original)}
                        style={{
                            backgroundColor: 'orange',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                        }}
                    >
                        Editar
                    </button>
                ),
            },
            {
                Header: 'Excluir',
                Cell: ({ row }) => (
                    <button
                        onClick={() => handleDelete(row.original._id)}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                        }}
                    >
                        Excluir
                    </button>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="table-container">
            <table {...getTableProps()} style={{ width: '100%' }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Modal de Edição */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Instituição</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInstituicao && <FormInstituicao formData={selectedInstituicao} onChange={handleFormChange} />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InstituicoesTable;
