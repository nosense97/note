google.charts.load("current", {
    packages: ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ["Element", "Density", {
            role: "style"
        }],
        ["Satellile", 4, "#b87333"],
        ["Depot", 5, "silver"],
        ["Station", 6, "#00A86B"],
        ["Hub", 3, "#CCCCFF"],
        ["Customer", 2, "gold"],
        ["Location", 3, "color: #e5e4e2"]
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1, {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2
    ]);

    var options = {
        title: "Density of Precious Metals, in g/cm^3",
        width: 600,
        height: 400,
        bar: {
            groupWidth: "95%"
        },
        legend: {
            position: "none"
        },
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('bieu_do_cot'));
    chart.draw(view, options);
}