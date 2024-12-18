import React, { useEffect, useRef, useState } from "react";
import backendUrl from "../../../utils/backend-url"; // Importa backendUrl
import axios from "axios";

import { useTheme, create, disposeAllCharts } from "@amcharts/amcharts4/core";
import { XYChart, CategoryAxis, ValueAxis, ColumnSeries } from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

useTheme(am4themes_animated);

const ChartQtdAlunos = ({ refreshData, onRefresh }) => {
    const chartDivRef = useRef(null);
    const [data, setData] = useState([]); // estado para armazenar os dados da API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = backendUrl + "/instituicoes/aggregate"; // rota da API
                const response = await axios.get(url);

                const result = response.data;

                if (Array.isArray(result)) {
                    // formata os dados conforme esperado pelo grafico
                    const formattedData = result.map((item) => ({
                        category: item.uf, // a uf sera a "category"
                        value: item.qtdAlunos, // doma dos alunos
                    }));
                    setData(formattedData);
                } else {
                    console.error("Formato inesperado de resposta da API:", result);
                }
            } catch (error) {
                console.error("Erro ao buscar os dados do grafico:", error);
            }
        };

        fetchData();
    }, [refreshData]);

    useEffect(() => {
        let chart;
    
        if (data.length > 0 && chartDivRef.current) {
            try {
                console.log("Iniciando gráfico com dados:", data);
    
                // limpa grficos existentes
                disposeAllCharts();
    
                // cria o grafico
                chart = create(chartDivRef.current, XYChart);
                chart.data = data;
    
                // configura o eixo X (categorias) - para barras verticais
                let categoryAxis = chart.xAxes.push(new CategoryAxis());
                categoryAxis.dataFields.category = "category";
                categoryAxis.renderer.grid.template.location = 0; // ajusta a posição
                categoryAxis.renderer.minGridDistance = 30; // epacamento mínimo entre categorias
    
                // configura o eixo Y (valores)
                let valueAxis = chart.yAxes.push(new ValueAxis());
                valueAxis.min = 0; // Garante que o valor mínimo comece em 0
    
                // configura a serie de colunas (barras verticais)
                let series = chart.series.push(new ColumnSeries());
                series.dataFields.valueY = "value"; // campo de valores no eixo Y
                series.dataFields.categoryX = "category"; // campo de categorias no eixo X
                series.columns.template.tooltipText = "{category}: [bold]{value}[/]";
                
                // pinta a colunas
                series.columns.template.adapter.add("fill", (fill, target) => {
                    // Gera cores diferentes para cada coluna usando a paleta padrão
                    return chart.colors.getIndex(target.dataItem.index);
                });
                series.columns.template.strokeWidth = 0;
                series.columns.template.fillOpacity = 0.8;
                
    
            } catch (error) {
                console.error("Erro ao criar o gráfico:", error);
            }
        }
    
        return () => {
            if (chart) {
                console.log("Desmontando o gráfico");
                chart.dispose();
            }
        };
    }, [data]);
    

    return (
        <div className="chart-container">
            <h1>Gráfico de quantidade de alunos</h1>
            <div
                ref={chartDivRef}
                style={{
                    width: "100%",
                    height: "500px",
                    minHeight: "500px",
                    backgroundColor: "#f0f0f0",
                }}
            ></div>
        </div>
    );
};

export default ChartQtdAlunos;
