import { dataJSON } from './JSONdata.js';

const data = dataJSON

export const vehicles = data['vehicles']
export const distances = data['distances']
export const locations = data['locations']
export const customers = data['customers']
export const depots = data['depots']
export const requests = data['requests']
export const matrixConfig = data['matrixConfig']
export const algoParams = data['algoParams']

export const drawPieCharts = (container_div, model, option) => {

    var BuildChart = (params) => {

        let divElememt = document.querySelector(params.div)
        if (divElememt) {

            google.charts.load('current', {
                'packages': ['corechart']
            });
            google.charts.setOnLoadCallback(drawVisualization);

            function drawVisualization() {

                var data = google.visualization.arrayToDataTable(params.dataTable);
                var chart = new google.visualization.PieChart(divElememt);
                chart.draw(data, params.options);
            }
        } else {
            console.log('error divElememt', divElememt)
        }
    }

    BuildChart.DataModel = () => { return model }

    BuildChart.Setting = () => { return option }

    BuildChart({
        div: container_div,
        dataTable: BuildChart.DataModel(),
        options: BuildChart.Setting(),
    })
}

export const drawStackedColumnCharts = (container_div, model, option) => {

    var BuildChart = (params) => {

        let divElememt = document.querySelector(params.div)
        if (divElememt) {

            google.charts.load('current', {
                'packages': ['corechart']
            });
            google.charts.setOnLoadCallback(drawVisualization);

            function drawVisualization() {

                var data = google.visualization.arrayToDataTable(params.dataTable);
                var chart = new google.visualization.ColumnChart(divElememt);
                chart.draw(data, params.options);
            }
        } else {
            console.log('error divElememt', divElememt)
        }
    }

    BuildChart.DataModel = () => { return model }

    BuildChart.Setting = () => { return option }

    BuildChart({
        div: container_div,
        dataTable: BuildChart.DataModel(),
        options: BuildChart.Setting(),
    })
}

export const drawMaterialColumnCharts = (container_div, model, option) => {

    var BuildChart = (params) => {

        let divElememt = document.querySelector(params.div)
        if (divElememt) {

            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(drawVisualization);

            function drawVisualization() {

                let data = google.visualization.arrayToDataTable(params.dataTable)
                let chart = new google.charts.Bar(divElememt);
                chart.draw(data, google.charts.Bar.convertOptions(params.options))
            }
        } else {
            console.log('error divElememt', divElememt)
        }
    }

    BuildChart.DataModel = () => { return model }

    BuildChart.Setting = () => { return option }

    BuildChart({
        div: container_div,
        dataTable: BuildChart.DataModel(),
        options: BuildChart.Setting(),
    })
}

export const drawComboCharts = (container_div, model, option) => {

    var BuildChart = (params) => {

        let divElememt = document.querySelector(params.div)
        if (divElememt) {

            google.charts.load('current', { 'packages': ['bar'] });
            google.charts.setOnLoadCallback(drawVisualization);

            function drawVisualization() {

                let data = google.visualization.arrayToDataTable(params.dataTable)
                let chart = new google.charts.Bar(divElememt);
                chart.draw(data, google.charts.Bar.convertOptions(params.options))
            }
        } else {
            console.log('error divElememt', divElememt)
        }
    }

    BuildChart.DataModel = () => { return model }

    BuildChart.Setting = () => { return option }

    BuildChart({
        div: container_div,
        dataTable: BuildChart.DataModel(),
        options: BuildChart.Setting(),
    })
}