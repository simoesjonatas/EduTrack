import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormInstituicao from '../FormInstituicao';
import backendUrl from '../../../utils/backend-url'; // URL do backend importada
import axios from 'axios';

const AddButton = (props) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        uf: '',
        qtdAlunos: '',
    });
    const [message, setMessage] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // manipula mudancas nos campos do formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // envia os dados do formulario para o backend
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${backendUrl}/instituicoes`, formData);

            setMessage('Instituição cadastrada com sucesso!');
            setShow(false); // Fecha o modal
            setFormData({
                nome: '',
                uf: '',
                qtdAlunos: '',
            });

            if (props.onInstituicaoAdded) {
                props.onInstituicaoAdded(response.data); // atualiza a lista de instituições no componente pai
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(`Erro: ${error.response.data.error}`);
            } else {
                setMessage('Erro ao conectar com o servidor.');
            }
            console.error(error);
        }
    };

    return (
        <div className="add-button-container">
            <Button variant="success" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Nova Instituição
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Instituição</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInstituicao
                        formData={formData}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddButton;
