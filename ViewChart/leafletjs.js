var map = L.map('map').setView([20.996491, 105.802082], 10);
// var map = L.map('map').setView([100, 100], 100);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


locationList =  [
    {
      "locationCode": "location_10000",
      "lat": 21.056932818831946,
      "lng": 105.92016033466976,
      "lTypes": [
        "SATELLITE"
      ]
    },
    {
      "locationCode": "location_10001",
      "lat": 21.02927015950773,
      "lng": 105.90052185576928,
      "lTypes": [
        "SATELLITE"
      ]
    },
    {
      "locationCode": "location_10002",
      "lat": 20.96568951648247,
      "lng": 105.92542733129305,
      "lTypes": [
        "CUSTOMER"
      ]
    },
    {
      "locationCode": "location_10003",
      "lat": 21.063566391084528,
      "lng": 105.82522561502218,
      "lTypes": [
        "DEPOT"
      ]
    },
    {
      "locationCode": "location_10004",
      "lat": 21.03324228464198,
      "lng": 105.86910693050348,
      "lTypes": [
        "STATION"
      ]
    },
    {
      "locationCode": "location_10005",
      "lat": 21.078499010023087,
      "lng": 105.91153635042572,
      "lTypes": [
        "STATION"
      ]
    },
    {
      "locationCode": "location_10006",
      "lat": 21.021475827408935,
      "lng": 105.79584943178537,
      "lTypes": [
        "DEPOT"
      ]
    },
    {
      "locationCode": "location_10007",
      "lat": 21.06080173100339,
      "lng": 105.85519185674526,
      "lTypes": [
        "CUSTOMER"
      ]
    },
    {
      "locationCode": "location_10008",
      "lat": 21.063226136377832,
      "lng": 105.93031915041541,
      "lTypes": [
        "CUSTOMER"
      ]
    },
    {
      "locationCode": "location_10009",
      "lat": 21.058560919322943,
      "lng": 105.89683896541482,
      "lTypes": [
        "STATION"
      ]
    },
    {
      "locationCode": "location_100010",
      "lat": 21.073220732939518,
      "lng": 105.85223010125316,
      "lTypes": [
        "STATION"
      ]
    },
    {
      "locationCode": "location_100011",
      "lat": 21.039358806478297,
      "lng": 105.84935427270068,
      "lTypes": [
        "CUSTOMER"
      ]
    },
    {
      "locationCode": "location_100012",
      "lat": 20.99346392367603,
      "lng": 105.84633837555602,
      "lTypes": [
        "DEPOT"
      ]
    },
    {
      "locationCode": "location_100013",
      "lat": 21.101249153063875,
      "lng": 105.90278035144733,
      "lTypes": [
        "DEPOT"
      ]
    },
    {
      "locationCode": "location_100014",
      "lat": 21.06055754680064,
      "lng": 105.80547959577393,
      "lTypes": [
        "STATION"
      ]
    },
    {
      "locationCode": "location_100015",
      "lat": 21.10714062069393,
      "lng": 105.78044214433598,
      "lTypes": [
        "STATION"
      ]
    },
    {
      "locationCode": "location_100016",
      "lat": 21.013489471936932,
      "lng": 105.82777107949349,
      "lTypes": [
        "HUB"
      ]
    }
  ]

var viewMapWithLeaflet = (locationList) => {
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

viewMapWithLeaflet(locationList)