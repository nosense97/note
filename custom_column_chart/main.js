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

var depotList = getDepot()
var depotAndFirstPointList = getFirstPointList(depotList, distances)
    // lấy ra được điểm depot và điểm gần nhất của nó, quãng đường và thời gian đi từ depot tới điểm gần nhất 


var getDataModel = (depotsList, depotAndFirstPointList, dataTable) => {

    // xác nhận lại việc data model nhận các giá trị thời gian của depot hay vehicle?
    // vẽ thêm 1 đường thẳng biểu thị thời gian bắt đầu di chuyển của veh từ depot đi
    // đề xuất lấy hết data bên depot

    // console.log('depotsList', depotsList)
    // console.log('depotAndFirstPointList', depotAndFirstPointList)

    for (let index = 0; index < depotsList.length; index++) {

        const element = depotsList[index];
        if (element.breakTimes.length === 1) {

            let timelineStartFirstPoint = -1
            let timelineFirstPoint = -1
            let timelineReturnDepot = -1
            let depotCode = element.depotCode
            let locationCode = element.locationCode
            let morningBreakTime = parseFloat(element.workingTime['start'].substring(11, 16).replace(':', '.'))
            let morningOperatingTime = 0
            let lunchBreakTime = 0
            let lunchBreakTimeEnd = 0
            let afternoonOperatingTime = parseFloat(element.workingTime['end'].substring(11, 16).replace(':', '.')) - lunchBreakTimeEnd
            let dinnerBreakTime = 24 - (morningBreakTime + morningOperatingTime + lunchBreakTime + afternoonOperatingTime)

            for (let j = 0; j < depotAndFirstPointList.length; j++) {
                const DAPList = depotAndFirstPointList[j];
                if (locationCode === DAPList.srcCode) {
                    // console.log('DAP', DAPList)
                    timelineStartFirstPoint = morningBreakTime
                    timelineFirstPoint = morningBreakTime + DAPList.travelTime
                    timelineReturnDepot = timelineFirstPoint + DAPList.travelTime
                }

            }

            for (let j = 0; j < element.breakTimes.length; j++) {
                const temp = element.breakTimes[j];
                lunchBreakTimeEnd = parseFloat(temp['end'].substring(11, 16).replace(':', '.'))
                lunchBreakTime = parseFloat(temp['end'].substring(11, 16).replace(':', '.')) - parseFloat(temp['start'].substring(11, 16).replace(':', '.'))
            }

            dataTable.push([
                depotCode,
                morningBreakTime,
                timelineStartFirstPoint,
                morningOperatingTime,
                lunchBreakTime,
                timelineFirstPoint,
                afternoonOperatingTime,
                timelineReturnDepot,
                dinnerBreakTime,
                ''
            ])
        }
    }
}

getDataModel(depots, depotAndFirstPointList, dataTable)
console.log('data model', dataTable)