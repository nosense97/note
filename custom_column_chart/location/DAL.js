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
    drawStackedColumnCharts
} from './model.js';



export const StackedColumnChart1 = () => {
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

    drawStackedColumnCharts('#chart_1', dataTable, options)
}

export const PieChart1 = () => {

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

    drawPieCharts('#chart_div', dataTable, options)
}