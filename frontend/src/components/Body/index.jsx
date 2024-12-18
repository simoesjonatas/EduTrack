import { useState } from 'react';
import AddButton from './AddButton';
import BackendStatus from './BackendStatus';
import ChartQtdAlunos from './ChartQtdAlunos';
import InstituicoesTable from './InstituicoesTable';
import './index.css';

const Body = () => {
    const [refreshCount, setRefreshCount] = useState(0);

    const handleRefresh = () => {
        setRefreshCount((prev) => prev + 1); 
    };

    return (
        <div className="body">
            <BackendStatus />
            <AddButton onInstituicaoAdded={handleRefresh} />
            <InstituicoesTable refreshData={refreshCount} onRefresh={handleRefresh} />
            <ChartQtdAlunos refreshData={refreshCount}  onRefresh={handleRefresh}/>
        </div>
    );
};

export default Body;
