import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button } from 'react-bootstrap';
import backendUrl from '../../../utils/backend-url';

const BackendStatus = () => {
    const [status, setStatus] = useState(null);

    const checkBackendStatus = async () => {
        try {
            const response = await axios.get(backendUrl);
            if (response.status === 200) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    useEffect(() => {
        checkBackendStatus();
    }, []);

    return (
        <div>
            {status === 'success' && (
                <Alert variant="success">
                    API do Backend está acessível.
                </Alert>
            )}
            {status === 'error' && (
                <Alert variant="danger">
                    API do Backend está inacessível,{''}
                    <Button variant="link" onClick={checkBackendStatus}>
                        clique aqui para tentar novamente
                    </Button>.
                </Alert>
            )}
        </div>
    );
};

export default BackendStatus;