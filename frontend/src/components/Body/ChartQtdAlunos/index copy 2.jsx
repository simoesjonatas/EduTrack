import React, { useEffect, useRef } from "react";
import './index.css';

import { useTheme, create, disposeAllCharts } from "@amcharts/amcharts4/core";
import { XYChart, CategoryAxis, ValueAxis, ColumnSeries } from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

useTheme(am4themes_animated);

const ChartQtdAlunos = () => {
    const chartDivRef = useRef(null);

    useEffect(() => {
        let chart;
    
        try {
            if (chartDivRef.current) {
                console.log("iniciando grfico no elemento:", chartDivRef.current);
    
                // limpa quaisquer graficos existentes antes de criar um novo
                am4core.disposeAllCharts();
    
                chart = am4core.create(chartDivRef.current, am4charts.XYChart);
    
                chart.data = [
                    { category: "A", value: 120 },
                    { category: "B", value: 150 },
                    { category: "C", value: 180 },
                    { category: "D", value: 100 },
                ];
    
                let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "category";
                categoryAxis.renderer.inversed = true;
    
                let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.opposite = true;
    
                let series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueX = "value";
                series.dataFields.categoryY = "category";
                series.columns.template.tooltipText = "{category}: [bold]{value}[/]";
                series.columns.template.fillOpacity = 0.8;
            }
        } catch (error) {
            console.error("ero ao criar o grafico:", error);
        }
    
        return () => {
            if (chart) {
                console.log("desmontando o grafico");
                chart.dispose();
            }
        };
    }, []);
    

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
