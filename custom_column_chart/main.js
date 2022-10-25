import {
    vehicles,
    locations,
    customers,
    depots,
    distances,
    requests,
    matrixConfig,
    algoParams
} from './const.js';


var BuildChart = (params) => {

    let divElememt = document.querySelector(params.div)
    if (divElememt) {

        google.charts.load('current', {
            'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawVisualization);

        function drawVisualization() {

            var data = google.visualization.arrayToDataTable(params.dataTable);
            var chart = new google.visualization.ComboChart(divElememt);
            chart.draw(data, params.options);
        }
    }
}

BuildChart.DataModel = () => {

    var convertTimeToMinutes = (time) => {

        time = time.split(":")
        let hours = String(parseInt(time[0]))
        let minutes = String((parseInt(time[1])))
        let result = -1

        if (parseInt(hours) > 0) result = (parseInt(hours) * 60) + parseInt(minutes)
        else result = parseInt(minutes)
        return result
    }

    var getDepot = () => {

        let result = []
        for (let i = 0; i < locations.length; i++) {

            let locationIndex = locations[i];
            for (let j = 0; j < locationIndex.lTypes.length; j++) {

                let locationType = locationIndex.lTypes[j];
                if (locationType === 'DEPOT') {
                    result.push(locationIndex.locationCode)
                }
            }
        }
        return result
    }

    var getFirstPointList = (depotList, distanceMatrix) => {

        let minDistanceOfDepot = (depotIndex, distanceMatrix, indexList) => {
            let minDistanceList = []
            let result = {}

            for (let i = 0; i < distanceMatrix.length; i++) {
                const distanceIndex = distanceMatrix[i]
                    // thêm điều kiện điểm gần nhất của depot không thể là depot
                if (depotIndex === distanceIndex.srcCode && depotIndex != distanceIndex.destCode) {
                    minDistanceList.push(distanceIndex.distance)
                }
            }

            let minInNumber = Math.min.apply(Math, minDistanceList)
            result[indexList] = { 'id': depotIndex, 'value': minInNumber }
            return result
        }

        let getFirstPoint = (minDistanceList) => {

            let resultTempList = []
            let deleteIndex = -1

            for (let i = 0; i < minDistanceList.length; i++) {
                const listIndex = minDistanceList[i]
                let key = listIndex[i].id
                let value = listIndex[i].value
                for (let j = 0; j < distanceMatrix.length; j++) {
                    if (key === distanceMatrix[j].srcCode && value === distanceMatrix[j].distance) {
                        resultTempList.push(distanceMatrix[j])
                    }
                }
            }

            for (let i = 0; i < resultTempList.length; i++) {
                for (let j = i + 1; j < resultTempList.length; j++) {
                    if (resultTempList[i].srcCode === resultTempList[j].srcCode && resultTempList[i].destCode === resultTempList[j].destCode) {
                        deleteIndex = resultTempList[i]
                    }
                }
            }

            let arrayRemove = (arr, value) => {
                return arr.filter(function(ele) {
                    return ele != value;
                });
            }

            let result = arrayRemove(resultTempList, deleteIndex);
            return result
        }

        let distanceList = []
        for (let i = 0; i < depotList.length; i++) {
            const depotIndex = depotList[i]
            let tempDistanceList = minDistanceOfDepot(depotIndex, distanceMatrix, i)
            distanceList.push(tempDistanceList)
        }
        return getFirstPoint(distanceList)
    }

    var sumTime = (start, end) => {

        start = start.split(":");
        end = end.split(":");
        let hours = -1
        let minutes = -1
        let sumMinutes = parseInt(start[1]) + parseInt(end[1])

        if (sumMinutes > 60) {
            hours = String(parseInt(start[0]) + parseInt(end[0]) + 1)
            minutes = String((parseInt(start[1]) + parseInt(end[1])) % 60)
        } else if (sumMinutes == 60) {
            hours = String(parseInt(start[0]) + parseInt(end[0]) + 1)
            minutes = '00'
        } else {
            hours = String(parseInt(start[0]) + parseInt(end[0]))
            minutes = String(parseInt(start[1]) + parseInt(end[1]))
        }

        if (parseInt(hours) < 10) hours = '0'.concat(hours)

        if (parseInt(minutes) < 10) minutes = '0'.concat(minutes)

        return hours.concat(":", minutes)
    }

    var caculateTime = (start, end) => {

        start = start.split(":");
        end = end.split(":");
        let startDate = new Date(0, 0, 0, start[0], start[1], 0);
        let endDate = new Date(0, 0, 0, end[0], end[1], 0);
        let diff = endDate.getTime() - startDate.getTime();
        let hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        let minutes = Math.floor(diff / 1000 / 60);

        if (hours < 0) hours = hours + 24;

        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
    }

    // đơn vị thời gian: giờ
    var convertTimeToHours = (travelTime) => {

        let result = ((travelTime * 100) / 60).toFixed(2)
        let time = result.split(".")
        let hours = String(parseInt(time[0]))
        let minutes = String((parseInt(time[1])))

        if (parseInt(hours) < 10) hours = '0'.concat(hours)

        if (parseInt(minutes) < 10) minutes = '0'.concat(minutes)

        return hours.concat(":", minutes)
    }

    var getDataModel = (depotsList, depotAndFirstPointList, dataTable) => {

        for (let index = 0; index < depotsList.length; index++) {

            const element = depotsList[index];
            if (element.breakTimes.length === 1) {

                let timelineStartFirstPoint = -1
                let timelineFirstPoint = -1
                let timelineReturnDepot = -1
                let depotCode = element.depotCode
                let locationCode = element.locationCode
                let workingTimeStart = element.workingTime['start'].substring(11, 16)
                let workingTimeEnd = element.workingTime['end'].substring(11, 16)
                let morningBreakTime = workingTimeStart
                let morningOperatingTime = 0
                let lunchBreakTime = 0
                let lunchBreakTimeStart = 0
                let lunchBreakTimeEnd = 0
                let afternoonOperatingTime = 0
                let dinnerBreakTime = 0

                for (let j = 0; j < depotAndFirstPointList.length; j++) {
                    const DAPList = depotAndFirstPointList[j];
                    if (locationCode === DAPList.srcCode) {
                        timelineStartFirstPoint = morningBreakTime
                        timelineFirstPoint = sumTime(morningBreakTime, String(convertTimeToHours(DAPList.travelTime)))
                        timelineReturnDepot = sumTime(timelineFirstPoint, convertTimeToHours(DAPList.travelTime))
                    }
                }

                for (let j = 0; j < element.breakTimes.length; j++) {

                    const temp = element.breakTimes[j];
                    lunchBreakTimeStart = temp['start'].substring(11, 16)
                    lunchBreakTimeEnd = temp['end'].substring(11, 16)
                    lunchBreakTime = caculateTime(lunchBreakTimeStart, lunchBreakTimeEnd)
                    morningOperatingTime = caculateTime(morningBreakTime, lunchBreakTimeStart)
                    afternoonOperatingTime = caculateTime(lunchBreakTimeEnd, workingTimeEnd)
                }
                let sumTimes = sumTime(sumTime(sumTime(morningBreakTime, morningOperatingTime), lunchBreakTime), afternoonOperatingTime)
                dinnerBreakTime = caculateTime(sumTimes, '24:00')

                dataTable.push([
                    depotCode, // 'Genre'
                    convertTimeToMinutes(morningBreakTime), // 'Thời gian Depot nghỉ sáng' = Thời gian kho mở cửa (workingTimeStart)
                    convertTimeToMinutes(morningOperatingTime), // 'Thời gian Depot hoạt động sáng' = Thời gian lunchBreakTimeStart - workingTimeStart
                    convertTimeToMinutes(lunchBreakTime), // 'Thời gian Depot nghỉ trưa'
                    convertTimeToMinutes(timelineFirstPoint), // 'Vehicle tới điểm đầu tiên',
                    convertTimeToMinutes(afternoonOperatingTime), // 'Thời gian Depot hoạt động chiều',
                    convertTimeToMinutes(timelineReturnDepot), // 'Vehicle trở lại kho',
                    convertTimeToMinutes(dinnerBreakTime), // 'Thời gian Depot nghỉ tối',
                    ''
                ])
            }
        }
    }

    // ========================================
    var dataTable = []
    dataTable.push([
        'Genre',
        'Thời gian Depot nghỉ sáng',
        'Thời gian Depot hoạt động sáng',
        'Thời gian Depot nghỉ trưa',
        'Vehicle tới điểm đầu tiên',
        'Thời gian Depot hoạt động chiều',
        'Vehicle trở lại kho',
        'Thời gian Depot nghỉ tối', {
            role: 'annotation'
        }
    ])
    var depotList = getDepot()
    var depotAndFirstPointList = getFirstPointList(depotList, distances)
    getDataModel(depots, depotAndFirstPointList, dataTable)

    return dataTable
}

console.log(BuildChart.DataModel())

// thêm constraint không được hoạt động vào thời gian buổi trưa
// đặt khoảng time nghỉ trưa, nếu thời gian quay lại depot / tới điểm đầu tiên của veh chạm phải vùng này
// thì lấy điểm đó trừ đi time break start ra số phút, cộng lại số phút đó vào điểm quay lại depot / tới first point

// ==========================================
BuildChart({
    div: '#chart_div',
    dataTable: BuildChart.DataModel(),
    options: {
        width: 1200,
        height: 600,
        legend: {
            position: 'right',
            maxLines: 10
        },
        bar: {
            groupWidth: '30%'
        },
        isStacked: true,
        title: 'Thời gian chạy của xe từ depot tham lam tới 1 điểm gần nhất',
        vAxis: {
            title: 'Thời gian 1 ngày',
        },
        hAxis: {
            title: 'Điểm Depot'
        },
        seriesType: 'bars',
        series: {
            0: { //'Thời gian Depot nghỉ sáng',
                color: '#D3D3D3'
            },
            1: {
                color: '#1E90FF'
            },
            2: {
                color: '#D3D3D3'
            },
            3: {
                color: 'red',
                type: 'line'
            },
            4: {
                color: '#1E90FF'
            },
            5: {
                color: 'red',
                type: 'line'
            },
            6: {
                color: '#D3D3D3'
            },
        }
    }
})