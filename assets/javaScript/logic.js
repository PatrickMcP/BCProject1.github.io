
var apiKey = "22c5ef699bce141cff90a305163f2989";

function searchBandsInTown(artist) {

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=" + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(queryURL);
    console.log(response);

    var artistName = $("<h1>").text(response.name);
    var artistURL = $("<a>").attr("href", response.url).append(artistName);
    var artistImage = $("<img>").attr("src", response.thumb_url);
    var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    $("#artist-div").empty();
    $("#artist-div").append(artistURL, artistImage, trackerCount, upcomingEvents, goToArtist);
  });
}



$("#select-artist").on("click", function (event) {

  event.preventDefault();

  var inputArtist = $("#artist-input").val().trim();


  searchBandsInTown(inputArtist);
  getVenueData(inputArtist);
});

///////////////////////////////////////////////////////////////////////////////
// Function: getVenueData
// Get 30 of the venues where the band is playing
//
// Inputs: Artist's name.
//
// Output:  Array containing the following data:
//
// Event_ID
// Event_Date
// Event_Time
// Event_Location
///////////////////////////////////////////////////////////////////////////////

function getVenueData(artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + apiKey;

  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }). then( (response) => {

    var eventData = [];
    
    for( let i = 0; i < response.length; ++i) {
      var myDate = response[i].datetime;

      eventData.push({
        event_Id: i,
        event_Date: moment(myDate).format("ddd, DD MMM YYYY"),
        event_Time: moment(myDate).format("hh:mm A"),
        event_Location: response[i].venue.city + ", " + response[i].venue.region
      });
    }
      return eventData;
      
  });
      
}