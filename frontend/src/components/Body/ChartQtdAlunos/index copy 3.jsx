import React, { useEffect, useRef, useState } from "react";
import backendUrl from "../../../utils/backend-url"; // Importa backendUrl
import axios from "axios";

import { useTheme, create, disposeAllCharts } from "@amcharts/amcharts4/core";
import { XYChart, CategoryAxis, ValueAxis, ColumnSeries } from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

useTheme(am4themes_animated);

const ChartQtdAlunos = () => {
    const chartDivRef = useRef(null);
    const [data, setData] = useState([]); // Estado para armazenar os dados da API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = backendUrl + "/instituicoes/aggregate"; // Rota da API
                const response = await axios.get(url);

                const result = response.data;

                if (Array.isArray(result)) {
                    // Formata os dados conforme esperado pelo grafico
                    const formattedData = result.map((item) => ({
                        category: item.uf, // A UF será a "category"
                        value: item.qtdAlunos, // Soma dos alunos
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
    }, []);

    useEffect(() => {
        let chart;

        if (data.length > 0 && chartDivRef.current) {
            try {
                console.log("Iniciando grafico com dados:", data);

                // Limpa graficos existentes
                disposeAllCharts();

                // Cria o grafico
                chart = create(chartDivRef.current, XYChart);
                chart.data = data;

                // Configura o eixo Y (categorias)
                let categoryAxis = chart.yAxes.push(new CategoryAxis());
                categoryAxis.dataFields.category = "category";
                categoryAxis.renderer.inversed = true;

                // Configura o eixo X (valores)
                let valueAxis = chart.xAxes.push(new ValueAxis());
                valueAxis.renderer.opposite = true;

                // Configura a série de colunas
                let series = chart.series.push(new ColumnSeries());
                series.dataFields.valueX = "value";
                series.dataFields.categoryY = "category";
                series.columns.template.tooltipText = "{category}: [bold]{value}[/]";
                series.columns.template.fillOpacity = 0.8;

            } catch (error) {
                console.error("Erro ao criar o grafico:", error);
            }
        }

        return () => {
            if (chart) {
                console.log("Desmontando o grafico");
                chart.dispose();
            }
        };
    }, [data]); // Atualiza o grafico sempre que os dados mudarem

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
