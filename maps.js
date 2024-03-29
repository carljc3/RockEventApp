var startLat
var startLong
var makeMarker = {}
var markerToMake = {}
var venueForMarkers = []
var name1
var name2
var name3
var latLon

//this function creates the cards based off the users input
function cards() {
  console.log(eventsFromUserChoices);

  for (let i = 0; i < eventsFromUserChoices[0].length; i++) {

    $(".main-container>.row").append(` <div id ="basic-cards" class="col s6 m7"> 
    
    <div class="card horizontal">
    <div class="card-image">
    <img id ="band-image" src="${eventsFromUserChoices[3][i]}"></div>
    <div class="card-stacked">

        <div id= "card-contents" class="card-content">
            <h5 id="artist-name">${eventsFromUserChoices[2][i]}</h5>
            <h6 id="venue-name">Event Info: |  Date: ${eventsFromUserChoices[0][i]} | ${eventsFromUserChoices[5][i]} | Time: ${eventsFromUserChoices[1][i]}</h6>
        t </div> 
          
        <div class="card-action">
        <a id="venue-name" class="waves-effect waves-light btn venue-buttons" data-venue="${(eventsFromUserChoices[5][i])}", data-lat="${eventsFromUserChoices[6][i]}", data-long="${eventsFromUserChoices[7][i]}" id="button-view"><i class="material-icons left">map</i>Maps</a>

            <a href="${eventsFromUserChoices[8][i]}"class="waves-effect waves-light btn"><i class="material-icons left">music_video</i>Youtube</a>
      
            <a class="waves-effect waves-light btn"><i class="material-icons left">email</i>Notifications</a>
           
        </div>
    </div>
    </div>`)
  }
}




//this function is used to get the users location, make a map and supply the cordinates to the ticketmaster api

//leahs code
function mapFor() {
  if (search === "currentLocation") {
    getLocation()
  }
  if (search === "seattle") {
    seattleLocation()
  }

}
//end leahs code

//if the user chooses to base it off their current location, this function gets their location, then uses the cordinates to basse for events
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

      lat = position.coords.latitude,
        lng = position.coords.longitude
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      startLat = lat
      startLong = lng
      latLon = (startLat + "," + startLong)
      // bandInfo(latLon)
      console.log(latLon)
      usersLocationQuery(latLon)
    })

  }

}

//if we dont have the users location this runs the map over seattle and supplies those cordinates for the ajax pull
function seattleLocation() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,



    center: new google.maps.LatLng(47.608013, -122.335167),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  latLon = (47.608013 + "," + -122.335167)

  console.log(latLon)

  // console.log(latLon)

  // bandInfo(latLon)
  seattleQuery(latLon)
}
//this doesnt work currently

//this doesnt work either, it is supposed to draw the longitude/latitude/venue name out of the venue button for placing a marker
$(document).on("click", ".venue-buttons", function (event) {
  event.preventDefault();

  var lats = $(this).attr("data-lat")
  var lon = $(this).attr("data-long")
  var ven = $(this).attr("data-venue")
  console.log(ven)
  lats2 = JSON.parse(lats)
  long2 = JSON.parse(lon)

  ven2 = JSON.stringify(ven)
  console.log("venue name" + ven2)

  console.log("stringify latitude" + lats2);
  console.log("stringify longitude" + long2);

  var lats = $(this).attr("data-lat")
  var lon = $(this).attr("data-long")
  var ven = $(this).attr("data-venue")
  // console.log(ven)
  lats2 = JSON.parse(lats)
  long2 = JSON.parse(lon)

  ven2 = JSON.stringify(ven)
  // console.log("venue name" +ven2)

  // console.log("stringify latitude" +lats2);
  // console.log("stringify longitude"+long2);


  markerToMake = {
    lat: lats2,
    lng: long2
  }
  console.log(markerToMake)
  venueMarkers(markerToMake, ven)
})

//after we have the information from the button this function places the markers
function venueMarkers() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: new google.maps.LatLng(lats2, long2),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  console.log("venue name" + ven2)
  var marker = new google.maps.Marker({
    position: markerToMake,
    map: map,
    title: ven2
  });
}

$(function() {
  $.fn.scrollBottom = function() {
      return $(document).height() - this.scrollTop() - this.height();
  };

  var $el = $('#map');
  var $window = $(window);

  $window.bind("scroll resize", function() {
      var gap = $window.height() - $el.height() - 30;
      var visibleFoot = 190 - $window.scrollBottom();
      var scrollTop = $window.scrollTop()
      
      if(scrollTop < 172 + 50){
          $el.css({
              top: (172 - scrollTop) + "px",
              bottom: "auto"
          });
      }else if (visibleFoot > gap) {
          $el.css({
              top: "auto",
              bottom: visibleFoot + "100px"
          });
      } else {
          $el.css({
              top: 35,
              bottom: "auto"
          });
      }
  });
});