// Global variables
var apiKey = "22c5ef699bce141cff90a305163f2989";
var eventData = [];
var currentBandName = "";
var eventDate = "";
var eventTime = "";
var eventLocation ="";

var config = {
  apiKey: "AIzaSyC9h2PUE_MqHDbAei_AROxKAEFDsayeOMI",
  authDomain: "this-is-a-thomas-project.firebaseapp.com",
  databaseURL: "https://this-is-a-thomas-project.firebaseio.com",
  projectId: "this-is-a-thomas-project",
  storageBucket: "this-is-a-thomas-project.appspot.com",
  messagingSenderId: "811715918066"
};

firebase.initializeApp(config);
var database = firebase.database();
var eventRef = database.ref("/events/");

function searchBandsInTown(artist) {

  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=" + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(queryURL);
    console.log(response);

    // Adding artist for later use
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



///////////////////////////////////////////////////////////////////////////////
// Function: displayVenues
// Creates a list of venues
//
// Inputs: None.
//
// Output:  None
//
///////////////////////////////////////////////////////////////////////////////

function displayVenues() {

  $("#venueData").empty();
  for( let i = 0; i < eventData.length; ++i) {
    console.log(eventData[i].event_Location)
    $("#venueData").append("<li class='collection-item venue-item' id='" +
      i + "'>" + eventData[i].event_Date + "\t" +
      eventData[i].event_Location + "\t" +
      eventData[i].event_Time + "\t" +
      "</li>");
  }
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
    // debugger;
    eventData.length = 0;
    for( let i = 0; i < response.length; ++i) {
      var myDate = response[i].datetime;
      // debugger;
      eventData.push({
        event_Id: i,
        event_Date: moment(myDate).format("ddd, DD MMM YYYY"),
        event_Time: moment(myDate).format("hh:mm A"),
        event_Location: response[i].venue.city + ", " + response[i].venue.region
      });
    }
      
    displayVenues();  
  });

  $(document).ready(function () {
    $(".button-collapse").sideNav();
    
    $("#venueData").on("click", ".venue-item", (event) => {
      var idNum = parseInt(event.target.attributes.id.nodeValue);
      currentBandName = $("h1").text();
      // console.log(eventData[idNum]);
      // console.log(eventData[idNum].event_Location);
      // debugger;
      eventRef.push({
        bandName: currentBandName,
        eventDate: eventData[idNum].event_Date,
        eventTime: eventData[idNum].event_Time,
        eventLocation: eventData[idNum].event_Location
      });

    });
  });

  eventRef.on("child_added", (snapshot) => {

  });
  
      
}