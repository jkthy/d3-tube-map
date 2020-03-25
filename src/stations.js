function Stations(stations) {
  this.stations = stations;
}

Stations.prototype.toArray = function() {
  var stations = [];

  for (var name in this.stations) {
    if (this.stations.hasOwnProperty(name)) {
      var station = this.stations[name];
      station.name = name;
      stations.push(station);
    }
  }

  return stations;
};

Stations.prototype.interchanges = function() {
  var interchangeStations = this.toArray();
  return interchangeStations.filter(function(station) {
    return station.marker === '1';
  });
};

Stations.prototype.normalStations = function() {
  var stations = this.toArray();

  var stationStations = stations.filter(function(station) {
    return station.marker !== '1';
  });

  var stationMarkers = [];

  stationStations.forEach(function(station) {
    stationMarkers.push({
      name: station.name,
      x: station.p.split(' ')[0],
      y: station.p.split(' ')[1],
      labelPos: station.labelPos,
    });
  });
  return stationMarkers;
};

export default function(stations) {
  return new Stations(stations);
}
