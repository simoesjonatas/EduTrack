import './index.css';

const ChartQtdAlunos = () => {
    return (
        <div className='chart-container'>
            <h1>Gráfico de quantidade de alunos</h1>
            <div className='chart-element'>
                <div className='chart'>Implemente o seguinte gráfico: <a href='https://www.amcharts.com/demos/column-with-rotated-series/'>https://www.amcharts.com/demos/column-with-rotated-series/</a></div>
                <div className='chart'>O gráfico deve ser implementado dentro dessa div, chart-element, removendo o conteúdo atual dela</div>
                <div className='chart'>Observe que o amcharts não está instalado no projeto. Você deve instalá-lo e configurá-lo</div>
            </div>
        </div>
    );
}

export default ChartQtdAlunos;