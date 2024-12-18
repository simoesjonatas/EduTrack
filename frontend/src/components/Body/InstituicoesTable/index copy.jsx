import React, { useEffect, useState } from 'react';
import backendUrl from '../../../utils/backend-url';
import axios from 'axios';
import { useTable } from 'react-table';
import { Modal, Button } from 'react-bootstrap';
import FormInstituicao from '../FormInstituicao';
import './index.css';

const InstituicoesTable = () => {
    const [data, setData] = useState([]); // estado para armazenar os dados da API
    const [showModal, setShowModal] = useState(false); // controle do modal de edicao
    const [selectedInstituicao, setSelectedInstituicao] = useState(null); // dados da instituicao selecionada

    // busca os dados da API ao carregar o componente
    const fetchData = async () => {
        try {
            const url = backendUrl + '/instituicoes';
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Erro ao buscar as instituições:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // funca para abrir o modal de edicao com os dados da instituicao selecionada
    const handleEdit = (instituicao) => {
        setSelectedInstituicao(instituicao); // define os dados no formulario
        setShowModal(true); // open modal
    };

    // funcao para enviar os dados editados ao backend
    const handleSaveEdit = async () => {
        try {
            const url = `${backendUrl}/instituicoes/${selectedInstituicao._id}`;
            await axios.put(url, selectedInstituicao);
            setShowModal(false); // close modal
            fetchData(); // recarrega os dados da tabela
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };

    // funcao para manipular a exclusao
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/instituicoes/${id}`);
            fetchData(); // Recarrega a tabela após exclusao
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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div className="table-container">
            <table {...getTableProps()} style={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} key={column.id}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id || row.index}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} key={cell.column.id}>
                                        {cell.render('Cell')}
                                    </td>
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
                    {selectedInstituicao && (
                        <FormInstituicao
                            formData={selectedInstituicao}
                            onChange={handleFormChange}
                        />
                    )}
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
