function initMap() {
  var myLatLng = {lat: 22.6322511, lng: 120.2984218};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: myLatLng //設定美麗島為地圖中心
  });
  setMarkers(map);
}

//設定Marker經緯度與Click事件
var setMarkers = function(map) {
    var stations = [
      ["101", 22.56481,120.35385],
      ["102", 22.57014,120.34214],
      ["103", 22.58035,120.32844],
      ["104", 22.58835,120.32174],
      ["105", 22.59690,120.31530],
      ["106", 22.60595,120.30821],
      ["107", 22.61384,120.30468],
      ["108", 22.62465,120.30117],
      // ["109", 22.63139,120.30195], 美麗島紅線，取999
      ["110", 22.63976,120.30211],
      ["111", 22.64831,120.30315],
      ["112", 22.65719,120.30309],
      ["113", 22.66636,120.30314],
      ["114", 22.67729,120.30662],
      ["115", 22.68829,120.30968],
      ["116", 22.70160,120.30256],
      ["117", 22.70848,120.30232],
      ["118", 22.71870,120.30718],
      ["119", 22.72235,120.31633],
      ["120", 22.72952,120.32069],
      ["121", 22.74466,120.31770],
      ["122", 22.75341,120.31456],
      ["123", 22.76048,120.31092],
      ["124", 22.78056,120.30167],
      ["201", 22.62154,120.27453],
      ["202", 22.62350,120.28378],
      ["203", 22.62899,120.29493],
      // 204 22.63139	120.30195 美麗島橘線，取999
      ["205", 22.63074,120.31162],
      ["206", 22.63030,120.31760],
      ["207", 22.62920,120.32769],
      ["208", 22.62731,120.33458],
      ["210", 22.62534,120.34831],
      ["209", 22.62487,120.34108],
      ["211", 22.62601,120.35588],
      ["212", 22.62526,120.36339],
      ["213", 22.62491,120.37248],
      ["214", 22.62217,120.39052],
      ["999", 22.63139,120.30195]
    ];
    //Marker icon SVG
    var customMarker = "M25 0c-8.284 0-15 6.656-15 14.866 0 8.211 15 35.135 15 35.135s15-26.924 15-35.135c0-8.21-6.716-14.866-15-14.866zm-.049 19.312c-2.557 0-4.629-2.055-4.629-4.588 0-2.535 2.072-4.589 4.629-4.589 2.559 0 4.631 2.054 4.631 4.589 0 2.533-2.072 4.588-4.631 4.588z";

    //把每個Marker放到地圖上
    for (var i = 0; i < stations.length; i++) {
      var station = stations[i];
      var marker = new google.maps.Marker({
        position: {lat: station[1], lng: station[2]},
        map: map,
        title: station[0],
        icon: {
          anchor: new google.maps.Point(25, 50),//offset
          path: customMarker,
          fillColor: (i<23)?"#e74c3c":"#f39c12",
          fillOpacity: 1,
          strokeColor: '',
          strokeWeight: 0
        }
      });
      makersOnClick(marker, map);//將marker傳到closure
    }
};

var makersOnClick = function(marker, map, data) {
  marker.addListener("click", function() {
    map.panTo({lat: marker.getPosition().lat(), lng: marker.getPosition().lng()});//用panTo移動至新中心點
    parseJSON(all_site_status_saved, marker);
  });
}
