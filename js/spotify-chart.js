var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0,11);
}

function extractPopularity(tracks) {
  var array = [];
  tracks.forEach(function(track){
    array.push(track.popularity);
  });
  return array;
}

function extractNames(tracks) {
  var array = [];
  tracks.forEach(function(track){
    array.push(track.name);
  });
  return array;
}

function chartData(labels, inputData) {
  dataSetProperties["data"] = inputData;
  // dataSetProperties["label"] = "label"
  var obj = {"labels": labels, 
    datasets: [dataSetProperties]
  };
  return obj;
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    contentType: 'application/json',
    success: function(data){
      callback(data.tracks);
    }
  });
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop10Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  var songs = extractTop10Tracks(parsedJSON);
  var nombres = extractNames(songs);
  var pop_kids = extractPopularity(songs);
  var bars = chartData(nombres, pop_kids);
  var ctx = $('#spotify-chart').get(0).getContext("2d");
  new Chart(ctx).Bar(bars);
}
