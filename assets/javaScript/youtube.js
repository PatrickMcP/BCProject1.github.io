function getVideos() {
    
    var apiInput = arguments[0].replace(/\s/g, "+");
    // remove spaces and replace with +'s
    console.log(apiInput);
    // YouTube Data API
    var apiKey = "AIzaSyAV8sYqQM1Pr09DcqAsD_AquZBDA1MFlfk"

    // Url for ajax query
    var queryUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + apiInput + "&type=playlist&key=" + apiKey;
    
    console.log(queryUrl);
    // ajax query
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(videoData) {
        ///console.log the whole data request response
        console.log(videoData);
        console.log(videoData.items[0].id.playlistId);
        
        var playlistInfo = "https://www.youtube.com/embed?listType=playlist&list=" + videoData.items[0].id.playlistId
        $("#playlistframe").attr("src", playlistInfo);
        $("#playlistframe").attr("width", 400);
        $("#playlistframe").attr("height", 200);
    });
 };

 $("#select-artist").on("click", function (event) {

    event.preventDefault();
  
    var inputArtist = $("#artist-input").val().trim();

    getVideos(inputArtist);
    
  });
