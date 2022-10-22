import {
    dataModel,
    vehicles,
    locations,
    customers,
    depots,
    distances,
    requests,
    matrixConfig,
    algoParams
} from './const.js';

var depotAnFirstPointList = []
var dataTable = []
dataTable.push([
    'Genre', 'Thời gian nghỉ sáng', 'Thời gian hoạt động sáng', 'Thời gian nghỉ trưa',
    'Mốc thời gian tới điểm đầu tiên', 'Thời gian hoạt động chiều',
    'Mốc thời gian quay trở lại kho', ' Thời gian nghỉ tối', {
        role: 'annotation'
    }
])

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
            if (depotIndex === distanceIndex.srcCode && depotIndex != distanceIndex.destCode) {
                minDistanceList.push(distanceIndex.distance)
            }
        }

        let minInNumber = Math.min.apply(Math, minDistanceList)
        result[indexList] = { 'id': depotIndex, 'value': minInNumber }
        return result
    }

    let getFirstPoint = (minDistanceList) => {
        for (let i = 0; i < minDistanceList.length; i++) {
            const listIndex = minDistanceList[i]
            let key = listIndex[i].id
            let value = listIndex[i].value
                // console.log('obj', key, '', value)
            for (let j = 0; j < distanceMatrix.length; j++) {
                // console.log('a', distanceMatrix[j])
                if (key === distanceMatrix[j].srcCode && value === distanceMatrix[j].distance) {
                    console.log('a', distanceMatrix[j])
                        // đẩy vào 1 mảng và loại bỏ phần tử giống nhau
                }
            }
        }
    }

    let distanceList = []
    for (let i = 0; i < depotList.length; i++) {
        const depotIndex = depotList[i]
        let tempDistanceList = minDistanceOfDepot(depotIndex, distanceMatrix, i)
        distanceList.push(tempDistanceList)
    }
    console.log('distanceObject', distanceList)
    getFirstPoint(distanceList)
}

var depotList = getDepot()
getFirstPointList(depotList, distances)


var getDataModel = () => {
    for (let index = 0; index < vehicles.length; index++) {

        const element = vehicles[index];
        if (element.breakTimes.length === 1) {
            let vehicleCode = element.vehicleCode
            let morningBreakTime = parseFloat(element.workingTime['start'].substring(11, 16).replace(':', '.'))
            let morningOperatingTime = 0
            let lunchBreakTime = 0
            let lunchBreakTimeEnd = 0
            let afternoonOperatingTime = parseFloat(element.workingTime['end'].substring(11, 16).replace(':', '.')) - lunchBreakTimeEnd
            let dinnerBreakTime = 24 - (morningBreakTime + morningOperatingTime + lunchBreakTime + afternoonOperatingTime)
            let timelineFirstPoint = 0 // thời gian đi từ điểm depot tới điểm gần nhất của nó 
                // tìm khoảng cách điểm gần nhất depot theo matrix distance
                // tính ra thời gian dựa trên quãng đường
            let timelineReturnDepot = 0

            console.log(element)

            for (let j = 0; j < element.breakTimes.length; j++) {
                const temp = element.breakTimes[j];
                lunchBreakTimeEnd = parseFloat(temp['end'].substring(11, 16).replace(':', '.'))
                lunchBreakTime = parseFloat(temp['end'].substring(11, 16).replace(':', '.')) - parseFloat(temp['start'].substring(11, 16).replace(':', '.'))
            }
        }
        // dataTable.push([element.vehicleCode])
    }
}

// getDataModel()