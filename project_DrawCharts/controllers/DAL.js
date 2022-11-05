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
    drawColumnCharts,
} from '../model/model.js';

import * as CONSTANTS from './const.js';



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
                    lunchBreakTime = CONSTANTS.caculateTime(lunchBreakTimeStart, lunchBreakTimeEnd)
                    morningOperatingTime = CONSTANTS.caculateTime(morningBreakTime, lunchBreakTimeStart)
                    afternoonOperatingTime = CONSTANTS.caculateTime(lunchBreakTimeEnd, workingTimeEnd)
                }

                for (let j = 0; j < depotAndFirstPointList.length; j++) {
                    const DAPList = depotAndFirstPointList[j];
                    if (locationCode === DAPList.srcCode) {
                        let tempTimelineFirstPoint = CONSTANTS.sumTime(morningBreakTime, String(CONSTANTS.convertTimeToHours(DAPList.travelTime)))
                        let tempTimelineReturnDepot = CONSTANTS.sumTime(tempTimelineFirstPoint, String(CONSTANTS.convertTimeToHours(DAPList.travelTime)))
                        timelineFirstPoint = CONSTANTS.constraintVehicleLunchBreak(lunchBreakTimeStart, lunchBreakTimeEnd, tempTimelineFirstPoint)
                        timelineReturnDepot = CONSTANTS.constraintVehicleLunchBreak(lunchBreakTimeStart, lunchBreakTimeEnd, tempTimelineReturnDepot)
                    }
                }

                let sumTimes = CONSTANTS.sumTime(CONSTANTS.sumTime(CONSTANTS.sumTime(morningBreakTime, morningOperatingTime), lunchBreakTime), afternoonOperatingTime)
                dinnerBreakTime = CONSTANTS.caculateTime(sumTimes, '24:00')

                dataTable.push([
                    depotCode, // 'Genre'
                    CONSTANTS.convertTimeToMinutes(morningBreakTime), // 'Thời gian Depot nghỉ sáng' = Thời gian kho mở cửa (workingTimeStart)
                    CONSTANTS.convertTimeToMinutes(morningOperatingTime), // 'Thời gian Depot hoạt động sáng' = Thời gian lunchBreakTimeStart - workingTimeStart
                    CONSTANTS.convertTimeToMinutes(lunchBreakTime), // 'Thời gian Depot nghỉ trưa'
                    timelineFirstPoint, // 'Vehicle tới điểm đầu tiên',
                    CONSTANTS.convertTimeToMinutes(afternoonOperatingTime), // 'Thời gian Depot hoạt động chiều',
                    timelineReturnDepot, // 'Vehicle trở lại kho',
                    CONSTANTS.convertTimeToMinutes(dinnerBreakTime), // 'Thời gian Depot nghỉ tối',
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
    var depotList = CONSTANTS.getDepot()
    var depotAndFirstPointList = CONSTANTS.getFirstPointList(depotList, distances)
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

export const StackedColumnChart2 = (div) => {

    var dataTable = []
    var getDataModel = (customers, dataTable) => {

        for (let index = 0; index < customers.length; index++) {

            const element = customers[index];
            if (element.breakTimes.length === 1) {

                let customerCode = element.customerCode
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
                    lunchBreakTime = CONSTANTS.caculateTime(lunchBreakTimeStart, lunchBreakTimeEnd)
                    morningOperatingTime = CONSTANTS.caculateTime(morningBreakTime, lunchBreakTimeStart)
                    afternoonOperatingTime = CONSTANTS.caculateTime(lunchBreakTimeEnd, workingTimeEnd)
                }

                let sumTimes = CONSTANTS.sumTime(CONSTANTS.sumTime(CONSTANTS.sumTime(morningBreakTime, morningOperatingTime), lunchBreakTime), afternoonOperatingTime)
                dinnerBreakTime = CONSTANTS.caculateTime(sumTimes, '24:00')

                dataTable.push([
                    customerCode,
                    CONSTANTS.convertTimeToMinutes(morningBreakTime),
                    CONSTANTS.convertTimeToMinutes(morningOperatingTime),
                    CONSTANTS.convertTimeToMinutes(lunchBreakTime),
                    CONSTANTS.convertTimeToMinutes(afternoonOperatingTime),
                    CONSTANTS.convertTimeToMinutes(dinnerBreakTime),
                    ''
                ])
            }
        }
    }

    dataTable.push([
        'Genre',
        'Thời gian Customer nghỉ sáng',
        'Thời gian Customer hoạt động sáng',
        'Thời gian Customer nghỉ trưa',
        'Thời gian Customer hoạt động chiều',
        'Thời gian Customer nghỉ tối', {
            role: 'annotation'
        }
    ])
    getDataModel(customers, dataTable)

    var options = {
        width: 1500,
        height: 600,
        legend: {
            position: 'right',
            maxLines: 10
        },
        bar: {
            groupWidth: '30%'
        },
        isStacked: true,
        title: 'Thời gian hoạt động/nghỉ của Customer',
        vAxis: {
            title: 'Thời gian 1 ngày (phút)',
        },
        hAxis: {
            title: 'Customer'
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

export const StackedColumnChart3 = (div) => {
    var dataTable = []
    var getDataModel = (depots, dataTable) => {

        for (let index = 0; index < depots.length; index++) {

            const element = depots[index];
            if (element.breakTimes.length === 1) {

                let customerCode = element.customerCode
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
                    lunchBreakTime = CONSTANTS.caculateTime(lunchBreakTimeStart, lunchBreakTimeEnd)
                    morningOperatingTime = CONSTANTS.caculateTime(morningBreakTime, lunchBreakTimeStart)
                    afternoonOperatingTime = CONSTANTS.caculateTime(lunchBreakTimeEnd, workingTimeEnd)
                }

                let sumTimes = CONSTANTS.sumTime(CONSTANTS.sumTime(CONSTANTS.sumTime(morningBreakTime, morningOperatingTime), lunchBreakTime), afternoonOperatingTime)
                dinnerBreakTime = CONSTANTS.caculateTime(sumTimes, '24:00')

                dataTable.push([
                    customerCode,
                    CONSTANTS.convertTimeToMinutes(morningBreakTime),
                    CONSTANTS.convertTimeToMinutes(morningOperatingTime),
                    CONSTANTS.convertTimeToMinutes(lunchBreakTime),
                    CONSTANTS.convertTimeToMinutes(afternoonOperatingTime),
                    CONSTANTS.convertTimeToMinutes(dinnerBreakTime),
                    ''
                ])
            }
        }
    }

    dataTable.push([
        'Genre',
        'Thời gian Customer nghỉ sáng',
        'Thời gian Customer hoạt động sáng',
        'Thời gian Customer nghỉ trưa',
        'Thời gian Customer hoạt động chiều',
        'Thời gian Customer nghỉ tối', {
            role: 'annotation'
        }
    ])
    getDataModel(depots, dataTable)

    var options = {
        width: 1500,
        height: 600,
        legend: {
            position: 'right',
            maxLines: 10
        },
        bar: {
            groupWidth: '30%'
        },
        isStacked: true,
        title: 'Thời gian hoạt động/nghỉ của Depots',
        vAxis: {
            title: 'Thời gian 1 ngày (phút)',
        },
        hAxis: {
            title: 'Customer'
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

export const ComboChart4 = (div) => {

    var dataTable = []
    var getDataModel = () => {

        let depotCode = -1
        let fixedLoadTime = -1
        let loadTimePerTon = -1
        let loadTimePerCbm = -1

        for (let i = 0; i < depots.length; i++) {
            const listIndex = depots[i];
            depotCode = listIndex.depotCode
            fixedLoadTime = listIndex.fixedLoadTime
            loadTimePerTon = listIndex.loadTimePerTon
            loadTimePerCbm = listIndex.loadTimePerCbm
            dataTable.push([String(depotCode), parseInt(fixedLoadTime), parseInt(loadTimePerTon), parseInt(loadTimePerCbm)])
        }
    }

    dataTable.push(['Depots', 'Fixed Load Time', 'Load Time Per Ton', 'Load Time Per Cbm'])
    getDataModel(locations, dataTable)

    var options = {
        height: 600,
        width: 1200,
        title: 'Time and fixed time with Depots',
        vAxes: [{
            title: 'Time (s/m3)',
            minValue: 0,
            maxValue: 100
        }],
        curveType: 'function',
        hAxis: {
            title: "Depots"
        },
        series: {
            0: {
                type: "line",
                targetAxisIndex: 0,
                color: "red"
            },
            1: {
                type: "bars",
                targetAxisIndex: 0,
                color: "green"
            },
            2: {
                type: "bars",
                targetAxisIndex: 0,
                color: "yellow"
            },
        }
    }

    drawComboCharts(div, dataTable, options)
}

export const ComboChart5 = (div) => {

    var dataTable = []
    var getDataModel = () => {

        let orderCode = -1
        let numberOfItem = -1
        let itemList = []
        let quantity = -1
        let weight = -1
        let cbm = -1

        for (let i = 0; i < requests.length; i++) {
            const listIndex = requests[i];
            orderCode = listIndex.orderCode
            itemList = listIndex.items
            numberOfItem = listIndex.items.length
            for (let j = 0; j < itemList.length; j++) {
                const itemIndex = itemList[j];
                quantity = itemIndex.quantity
                weight = itemIndex.weight
                cbm = itemIndex.cbm
            }
            dataTable.push([String(orderCode), parseInt(weight), parseInt(cbm), parseInt(quantity)])
        }
    }

    dataTable.push(['Requests', 'Weight', 'CBM', 'Quantity'])
    getDataModel(locations, dataTable)

    var options = {
        width: 4000,
        height: 600,
        title: 'Weight và CBM của đơn hàng',
        vAxes: [{
            title: 'Weight (gram)',
            minValue: 0,
            maxValue: 120
        }, {
            title: 'CBM (cm3)',
            minValue: 0,
            maxValue: 60
        }],
        curveType: 'function',
        hAxis: {
            title: "Requests"
        },
        series: {
            0: {
                type: "bars",
                targetAxisIndex: 0,
                color: "blue"
            },
            1: {
                type: "bars",
                targetAxisIndex: 1,
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

export const ComboChart6 = (div) => {

    var dataTable = []
    var getDataModel = () => {

        let orderCode = -1
        let deliveryLocationCode = -1
        let pickupLocationCode = -1
        let srcCode = -1
        let destCode = -1
        let distance = -1
        let travelTime = -1

        for (let i = 0; i < requests.length; i++) {
            const listIndex = requests[i]
            orderCode = listIndex.orderCode
            deliveryLocationCode = listIndex.deliveryLocationCode
            pickupLocationCode = listIndex.pickupLocationCode

            for (let j = 0; j < distances.length; j++) {
                const distanceIndex = distances[j];
                srcCode = distanceIndex.srcCode
                destCode = distanceIndex.destCode
                distance = distanceIndex.distance
                travelTime = CONSTANTS.convertTimeToHours(distanceIndex.travelTime)

                if ((srcCode === pickupLocationCode) && (destCode === deliveryLocationCode)) {
                    dataTable.push([String(orderCode), parseFloat(distance), parseFloat(travelTime)])
                }
            }
        }
    }

    dataTable.push(['Request', 'Distance', 'Travel Time'])
    getDataModel(locations, dataTable)

    var options = {
        height: 600,
        width: 4000,
        title: 'Distance and Travel Time of Requests',
        vAxes: [{
            title: 'Distance (km)',
            minValue: 0,
            maxValue: 100
        }, {
            title: 'Travel Time (h)',
            minValue: 0,
            maxValue: 24
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
                type: "line",
                targetAxisIndex: 1,
                color: "red"
            },
        }
    }

    drawComboCharts(div, dataTable, options)
}


// xem lại hàm CONSTANTS.convertTimeToHours