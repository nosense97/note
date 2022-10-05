var map = L.map('map').setView([20.996491, 105.802082], 19);
// var map = L.map('map').setView([100, 100], 100);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var locationList = [{
        "locationCode": "location_10000",
        "lat": 41.51560981024413,
        "lng": 38.92986112010347,
        "lTypes": ["CUSTOMER"]
    },
    {
        "locationCode": "location_10001",
        "lat": 76.87769871486262,
        "lng": 69.57919451585865,
        "lTypes": ["DEPOT"]
    },
    {
        "locationCode": "location_10002",
        "lat": 10.843985340004783,
        "lng": 77.26617511016022,
        "lTypes": ["HUB"]
    },
    {
        "locationCode": "location_10003",
        "lat": 1.8159249187183721,
        "lng": 44.86292953130218,
        "lTypes": ["SATELLITE"]
    },
    {
        "locationCode": "location_10004",
        "lat": 41.52163837389688,
        "lng": 81.8060533773322,
        "lTypes": ["CUSTOMER"]
    },
    {
        "locationCode": "location_10005",
        "lat": 91.54452721994956,
        "lng": 24.613298382929162,
        "lTypes": ["DEPOT"]
    },
    {
        "locationCode": "location_10006",
        "lat": 52.60980419448727,
        "lng": 74.9865894676886,
        "lTypes": ["STATION"]
    },
    {
        "locationCode": "location_10007",
        "lat": 82.63691886641728,
        "lng": 21.666686581896585,
        "lTypes": ["STATION"]
    },
    {
        "locationCode": "location_10008",
        "lat": 41.73634539860883,
        "lng": 75.57655186463657,
        "lTypes": ["CUSTOMER"]
    },
    {
        "locationCode": "location_10009",
        "lat": 84.8383765993445,
        "lng": 77.13648674916266,
        "lTypes": ["CUSTOMER"]
    },
    {
        "locationCode": "location_100010",
        "lat": 84.40826681809678,
        "lng": 41.058661586547025,
        "lTypes": ["SATELLITE"]
    },
    {
        "locationCode": "location_100011",
        "lat": 95.83542435089909,
        "lng": 51.746432685065926,
        "lTypes": ["SATELLITE"]
    }
]

var viewMap = (locationList) => {
    locationList.forEach(location => {
        let marker = L.marker([location.lat, location.lng]).addTo(map);
        let concatLocationType = ''
        location.lTypes.forEach(type => {
            concatLocationType += type
        })
        console.log(location, concatLocationType)
        marker.bindPopup(concatLocationType).openPopup();
    });
}

viewMap(locationList)