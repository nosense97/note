import {
    vehicles,
    locations,
    customers,
    depots,
    distances,
    requests,
    matrixConfig,
    algoParams,

    drawPieCharts,
    drawStackedColumnCharts,
    drawMaterialColumnCharts,
    drawComboCharts,
    drawComboChartsWithStackedColumn,
} from '../model/model.js';



export const PieChart1 = (div) => {

    var dataTable = []
    var getDataModel = (locations, dataTable) => {
        let getLocationTypeList = () => {

            let numberOfCustomer = 0
            let numberOfDepot = 0
            let numberOfStation = 0
            let numberOfHub = 0
            let numberOfSatellife = 0

            for (let i = 0; i < locations.length; i++) {
                const locationType = locations[i].lTypes;
                for (let j = 0; j < locationType.length; j++) {
                    const type = locationType[j];

                    switch (type) {
                        case "HUB":
                            numberOfHub += 1
                            break;
                        case "DEPOT":
                            numberOfDepot += 1
                            break;
                        case "STATION":
                            numberOfStation += 1
                            break;
                        case "CUSTOMER":
                            numberOfCustomer += 1
                            break;
                        case "SATELLITE":
                            numberOfSatellife += 1
                            break;
                    }
                }
            }

            return [
                { key: 'Customer', value: numberOfCustomer },
                { key: 'Depot', value: numberOfDepot },
                { key: 'Station', value: numberOfStation },
                { key: 'Hub', value: numberOfHub },
                { key: 'Satellife', value: numberOfSatellife },
            ]
        }

        let locationTypeList = getLocationTypeList()
        for (let i = 0; i < locationTypeList.length; i++) {
            const listIndex = locationTypeList[i];
            dataTable.push([listIndex.key, listIndex.value])
        }
    }

    dataTable.push(['Task', 'Hours per Day'])
    getDataModel(locations, dataTable)

    var options = {
        width: 1200,
        height: 600,
        title: 'Tỷ lệ các loại điểm trong Location list',
        pieHole: 0.4,
    }

    drawPieCharts(div, dataTable, options)
}

export const StackedColumnChart1 = (div) => {
    var dataTable = []
    var getDataModel = (vehicles, dataTable) => {

        // chuyển thời gian dạng 'hh:mm' sang số phút
        let convertTimeToMinutes = (time) => {

            time = time.split(":")
            let hours = String(parseInt(time[0]))
            let minutes = String((parseInt(time[1])))
            let result = -1

            if (parseInt(hours) > 0) result = (parseInt(hours) * 60) + parseInt(minutes)
            else result = parseInt(minutes)
            return result
        }

        // cộng 2 mốc thời gian
        let sumTime = (start, end) => {

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

        // trừ 2 mốc thời gian end - start
        let caculateTime = (start, end) => {

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

        for (let index = 0; index < vehicles.length; index++) {

            const element = vehicles[index];
            if (element.breakTimes.length === 1) {

                let vehicleCode = element.vehicleCode
                let workingTimeStart = element.workingTime['start'].substring(11, 16)
                let workingTimeEnd = element.workingTime['end'].substring(11, 16)
                let morningBreakTime = workingTimeStart
                let morningOperatingTime = 0
                let lunchBreakTime = 0
                let lunchBreakTimeStart = 0
                let lunchBreakTimeEnd = 0
                let afternoonOperatingTime = 0
                let dinnerBreakTime = 0

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
                    vehicleCode,
                    convertTimeToMinutes(morningBreakTime),
                    convertTimeToMinutes(morningOperatingTime),
                    convertTimeToMinutes(lunchBreakTime),
                    convertTimeToMinutes(afternoonOperatingTime),
                    convertTimeToMinutes(dinnerBreakTime),
                    ''
                ])
            }
        }
    }

    dataTable.push([
        'Genre',
        'Thời gian Vehicle nghỉ sáng',
        'Thời gian Vehicle hoạt động sáng',
        'Thời gian Vehicle nghỉ trưa',
        'Thời gian Vehicle hoạt động chiều',
        'Thời gian Vehicle nghỉ tối', {
            role: 'annotation'
        }
    ])
    getDataModel(vehicles, dataTable)

    var options = {
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
        title: 'Thời gian hoạt động/nghỉ của Vehicle',
        vAxis: {
            title: 'Thời gian 1 ngày (theo phút)',
        },
        hAxis: {
            title: 'Phương tiện vận chuyển'
        },
        seriesType: 'bars',
        series: {
            0: {
                color: '#D3D3D3'
            },
            1: {
                color: '#1E90FF'
            },
            2: {
                color: '#D3D3D3'
            },
            3: {
                color: '#1E90FF'
            },
            4: {
                color: '#D3D3D3'
            },
        }
    }

    drawStackedColumnCharts(div, dataTable, options)
}

export const MaterialColumnChart1 = (div) => {
    var dataTable = []
    var getDataModel = () => {

        let vehicleCode = -1
        let vehicleCBM = -1
        let vehicleCapacity = -1

        for (let i = 0; i < vehicles.length; i++) {
            const listIndex = vehicles[i];
            vehicleCode = listIndex.vehicleCode
            vehicleCBM = listIndex.cbm
            vehicleCapacity = listIndex.capacity
            dataTable.push([String(vehicleCode), parseInt(vehicleCBM), parseInt(vehicleCapacity)])
        }
    }

    dataTable.push(['Vehicle', 'CBM', 'Capacity'])
    getDataModel(locations, dataTable)

    var options = {
        width: 1200,
        height: 600,
        chart: {
            title: 'Trọng tải của phương tiện di chuyển',
            subtitle: 'CBM ở bên trái, Capacity ở bên phải'
        },
        series: {
            0: { axis: 'CBM' }, // Bind series 0 to an axis named 'distance'.
            1: { axis: 'Capacity' } // Bind series 1 to an axis named 'brightness'.
        },
        axes: {
            y: {
                CBM: { label: 'CBM (cm3)' }, // Left y-axis.
                Capacity: { side: 'right', label: 'Capacity (gram)' } // Right y-axis.
            }
        }
    }

    drawMaterialColumnCharts(div, dataTable, options)
}

export const ComboChart1 = (div) => {
    var dataTable = []
    var getDataModel = () => {

        let vehicleCode = -1
        let vehicleCBM = -1
        let vehicleLoadTimePerCbm = -1
        let vehicleUnloadTimePerCbm = -1

        for (let i = 0; i < vehicles.length; i++) {
            const listIndex = vehicles[i];
            vehicleCode = listIndex.vehicleCode
            vehicleCBM = listIndex.cbm
            vehicleLoadTimePerCbm = listIndex.loadTimePerCbm
            vehicleUnloadTimePerCbm = listIndex.unloadTimePerCbm
            dataTable.push([String(vehicleCode), parseInt(vehicleCBM), parseInt(vehicleLoadTimePerCbm), parseInt(vehicleUnloadTimePerCbm)])
        }
    }

    dataTable.push(['Vehicle', 'CBM', 'Load Time Per Cbm', 'Unload Time Per Cbm'])
    getDataModel(locations, dataTable)

    var options = {
        height: 600,
        width: 1200,
        title: 'Thời gian Load/Unload time của phương tiện với CBM',
        vAxes: [{
            title: 'Time (s/m3)',
            minValue: 0,
            maxValue: 100
        }, {
            title: 'CBM (m3)',
            minValue: 0,
            maxValue: 100
        }],
        curveType: 'function',
        hAxis: {
            title: "Vehicle"
        },
        series: {
            0: {
                type: "bars",
                targetAxisIndex: 0,
                color: "blue"
            },
            1: {
                type: "bars",
                targetAxisIndex: 0,
                color: "green"
            },
            2: {
                type: "line",
                targetAxisIndex: 1,
                color: "red"
            },
        }
    }

    drawComboCharts(div, dataTable, options)
}

export const ComboChart2 = (div) => {
    var dataTable = []
    var getDataModel = () => {

        let vehicleCode = -1
        let vehicleCapacity = -1
        let vehicleLoadTimePerTon = -1
        let vehicleUnloadTimePerTon = -1

        for (let i = 0; i < vehicles.length; i++) {
            const listIndex = vehicles[i];
            vehicleCode = listIndex.vehicleCode
            vehicleCapacity = listIndex.capacity
            vehicleLoadTimePerTon = listIndex.loadTimePerTon
            vehicleUnloadTimePerTon = listIndex.unloadTimePerTon
            dataTable.push([String(vehicleCode), parseInt(vehicleCapacity), parseInt(vehicleLoadTimePerTon), parseInt(vehicleUnloadTimePerTon)])
        }
    }

    dataTable.push(['Vehicle', 'Capacity', 'Load Time Per Ton', 'Unload Time Per Ton'])
    getDataModel(locations, dataTable)

    var options = {
        height: 600,
        width: 1200,
        title: 'Thời gian Load/Unload time của phương tiện với Capacity',
        vAxes: [{
            title: 'Time (s/Ton)',
            minValue: 0,
            maxValue: 100
        }, {
            title: 'Capacity (gram)',
            minValue: 0,

            maxValue: 100
        }],
        curveType: 'function',
        hAxis: {
            title: "Vehicle"
        },
        series: {
            0: {
                type: "bars",
                targetAxisIndex: 0,
                color: "blue"
            },
            1: {
                type: "bars",
                targetAxisIndex: 0,
                color: "green"
            },
            2: {
                type: "line",
                targetAxisIndex: 1,
                color: "red"
            },
        }
    }

    drawComboCharts(div, dataTable, options)
}

export const ComboChart3 = (div) => {
    var dataTable = []
    var getDataModel = () => {

        let customerCode = -1
        let customerFixedUnloadTime = -1
        let customerUnloadTimePerTon = -1
        let customerUnloadTimePerCbm = -1

        for (let i = 0; i < customers.length; i++) {
            const listIndex = customers[i];
            customerCode = listIndex.customerCode
            customerFixedUnloadTime = listIndex.fixedUnloadTime
            customerUnloadTimePerCbm = listIndex.unloadTimePerCbm
            customerUnloadTimePerTon = listIndex.unloadTimePerTon
            dataTable.push([String(customerCode), parseInt(customerUnloadTimePerCbm), parseInt(customerUnloadTimePerTon), parseInt(customerFixedUnloadTime)])
        }
    }

    dataTable.push(['Customer', 'Unload Time Per Cbm (s/m3)', 'Unload Time Per Ton (s/Ton)', 'Fixed Unload Time (s)'])
    getDataModel(locations, dataTable)

    var options = {
        height: 600,
        width: 1200,
        title: 'Thời gian Load/Unload time Per Unit của Customer',
        vAxes: [{
            title: 'Unload Time Per Unit (time unit)',
            minValue: 0,
            maxValue: 100
        }, {
            title: 'Fixed Unload Time (s)',
            minValue: 0,
            maxValue: 100
        }],
        curveType: 'function',
        hAxis: {
            title: "Customer"
        },
        series: {
            0: {
                type: "bars",
                targetAxisIndex: 0,
                color: "blue"
            },
            1: {
                type: "bars",
                targetAxisIndex: 0,
                color: "green"
            },
            2: {
                type: "line",
                targetAxisIndex: 1,
                color: "red"
            },
        }
    }

    drawComboCharts(div, dataTable, options)
}

export const ComboChartsWithStackedColumn1 = (div) => {

    // chuyển thời gian dạng 'hh:mm' sang số phút
    var convertTimeToMinutes = (time) => {

        time = time.split(":")
        let hours = String(parseInt(time[0]))
        let minutes = String((parseInt(time[1])))
        let result = -1

        if (parseInt(hours) > 0) result = (parseInt(hours) * 60) + parseInt(minutes)
        else result = parseInt(minutes)
        return result
    }

    /*
        xe không được chạy trong khoảng thời gian nghỉ trưa
        - điểm tới vào khung nghỉ trưa => bắt đầu vào đầu giờ chiều + số giờ đã lấn vào khung nghỉ trưa
        - không vào khung nghỉ trưa => time ban đầu
    */
    var constraintVehicleLunchBreak = (lunchBreakTimeStart, lunchBreakTimeEnd, vehicleRunTime) => {

        let convertParams = (params) => {
            if (typeof(params) === 'string') return convertTimeToMinutes(params)
            else return 'can\'t convert ' + params
        }

        // convert to minute
        lunchBreakTimeStart = convertParams(lunchBreakTimeStart)
        lunchBreakTimeEnd = convertParams(lunchBreakTimeEnd)
        vehicleRunTime = convertParams(vehicleRunTime)

        if ((vehicleRunTime >= lunchBreakTimeStart) && (vehicleRunTime < lunchBreakTimeEnd)) {
            return vehicleRunTime + (lunchBreakTimeEnd - lunchBreakTimeStart)
        } else {
            return vehicleRunTime
        }
    }

    // lấy ra Depot List từ Location List
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

    // lấy danh sách điểm gần nhất của Depot từ Depot List và DistanceMatrix
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

    // cộng 2 mốc thời gian
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

    // trừ 2 mốc thời gian end - start
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

    /*
        chuyển đổi thời gian di chuyển giữa 2 điểm sang giờ 
        docs: https://docs.google.com/spreadsheets/d/1qlfM2PVeQxMbp1JLYKIfSf9Ytq0Vk6X_9KRH5QSaryk/edit#gid=938694669
        input: 0.7073194313603591 (% giờ)
        output: 01:18 (giờ)
    */
    var convertTimeToHours = (travelTime) => {

        let result = ((travelTime * 100) / 60).toFixed(2)
        let time = result.split(".")
        let hours = String(parseInt(time[0]))
        let minutes = String((parseInt(time[1])))

        if (parseInt(hours) < 10) hours = '0'.concat(hours)
        if (parseInt(minutes) < 10) minutes = '0'.concat(minutes)
        return hours.concat(":", minutes)
    }

    var getDataModel = (depotList, depotAndFirstPointList, dataTable) => {

        for (let index = 0; index < depotList.length; index++) {

            const element = depotList[index];
            if (element.breakTimes.length === 1) {

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

                for (let j = 0; j < element.breakTimes.length; j++) {
                    const temp = element.breakTimes[j];
                    lunchBreakTimeStart = temp['start'].substring(11, 16)
                    lunchBreakTimeEnd = temp['end'].substring(11, 16)
                    lunchBreakTime = caculateTime(lunchBreakTimeStart, lunchBreakTimeEnd)
                    morningOperatingTime = caculateTime(morningBreakTime, lunchBreakTimeStart)
                    afternoonOperatingTime = caculateTime(lunchBreakTimeEnd, workingTimeEnd)
                }

                for (let j = 0; j < depotAndFirstPointList.length; j++) {
                    const DAPList = depotAndFirstPointList[j];
                    if (locationCode === DAPList.srcCode) {
                        let tempTimelineFirstPoint = sumTime(morningBreakTime, String(convertTimeToHours(DAPList.travelTime)))
                        let tempTimelineReturnDepot = sumTime(tempTimelineFirstPoint, String(convertTimeToHours(DAPList.travelTime)))
                        timelineFirstPoint = constraintVehicleLunchBreak(lunchBreakTimeStart, lunchBreakTimeEnd, tempTimelineFirstPoint)
                        timelineReturnDepot = constraintVehicleLunchBreak(lunchBreakTimeStart, lunchBreakTimeEnd, tempTimelineReturnDepot)
                    }
                }

                let sumTimes = sumTime(sumTime(sumTime(morningBreakTime, morningOperatingTime), lunchBreakTime), afternoonOperatingTime)
                dinnerBreakTime = caculateTime(sumTimes, '24:00')

                dataTable.push([
                    depotCode, // 'Genre'
                    convertTimeToMinutes(morningBreakTime), // 'Thời gian Depot nghỉ sáng' = Thời gian kho mở cửa (workingTimeStart)
                    convertTimeToMinutes(morningOperatingTime), // 'Thời gian Depot hoạt động sáng' = Thời gian lunchBreakTimeStart - workingTimeStart
                    convertTimeToMinutes(lunchBreakTime), // 'Thời gian Depot nghỉ trưa'
                    timelineFirstPoint, // 'Vehicle tới điểm đầu tiên',
                    convertTimeToMinutes(afternoonOperatingTime), // 'Thời gian Depot hoạt động chiều',
                    timelineReturnDepot, // 'Vehicle trở lại kho',
                    convertTimeToMinutes(dinnerBreakTime), // 'Thời gian Depot nghỉ tối',
                    ''
                ])
            }
        }
    }

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

    var options = {
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
            0: {
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

    drawComboChartsWithStackedColumn(div, dataTable, options)
}