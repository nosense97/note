import {
    vehicles,
    locations,
    customers,
    depots,
    distances,
    requests,
    matrixConfig,
    algoParams,
} from '../model/model.js';

// chuyển thời gian dạng 'hh:mm' sang số phút
export const convertTimeToMinutes = (time) => {

    time = time.split(":")
    var hours = String(parseInt(time[0]))
    var minutes = String((parseInt(time[1])))
    var result = -1

    if (parseInt(hours) > 0) result = (parseInt(hours) * 60) + parseInt(minutes)
    else result = parseInt(minutes)
    return result
}

/*
    xe không được chạy trong khoảng thời gian nghỉ trưa
    - điểm tới vào khung nghỉ trưa => bắt đầu vào đầu giờ chiều + số giờ đã lấn vào khung nghỉ trưa
    - không vào khung nghỉ trưa => time ban đầu
*/
export const constraintVehicleLunchBreak = (lunchBreakTimeStart, lunchBreakTimeEnd, vehicleRunTime) => {

    var convertParams = (params) => {
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
export const getDepot = () => {

    var result = []
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
export const getFirstPointList = (depotList, distanceMatrix) => {

    var minDistanceOfDepot = (depotIndex, distanceMatrix, indexList) => {
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

    var getFirstPoint = (minDistanceList) => {

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

    var distanceList = []
    for (let i = 0; i < depotList.length; i++) {
        const depotIndex = depotList[i]
        let tempDistanceList = minDistanceOfDepot(depotIndex, distanceMatrix, i)
        distanceList.push(tempDistanceList)
    }
    return getFirstPoint(distanceList)
}

// cộng 2 mốc thời gian
export const sumTime = (start, end) => {

    start = start.split(":");
    end = end.split(":");
    var hours = -1
    var minutes = -1
    var sumMinutes = parseInt(start[1]) + parseInt(end[1])

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
export const caculateTime = (start, end) => {

    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    if (hours < 0) hours = hours + 24;
    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
}

/*
    chuyển đổi thời gian di chuyển giữa 2 điểm sang giờ 
    docs: https://docs.google.com/spreadsheets/d/1qlfM2PVeQxMbp1JLYKIfSf9Ytq0Vk6X_9KRH5QSaryk/edit#gid=938694669
    input: 0.7073194313603591 (% giờ)
    output: 01:18 (giờ)
*/
export const convertTimeToHours = (travelTime) => {

    var result = ((travelTime * 100) / 60).toFixed(2)
    var time = result.split(".")
    var hours = String(parseInt(time[0]))
    var minutes = String((parseInt(time[1])))

    if (parseInt(hours) < 10) hours = '0'.concat(hours)
    if (parseInt(minutes) < 10) minutes = '0'.concat(minutes)
    return hours.concat(":", minutes)
}