    // Variables and Setters

  var map;
  var markerUserClick = null;
  var markerDB = [];
  var marker = null;
  var markerCar = null;
  var latlng = null;
  var coords = null;
  var address = null;
  var geocoder = new google.maps.Geocoder;
  var carId = null;
  var mailOwner = null;
  var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,50)});
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  function setMailOwner(newMailOwner){
    mailOwner = newMailOwner;
  }

  function setCarId(id){
    carId = id;
  }
  
  function setMarkerDB(marker){
    markerDB.push(marker);
  }

  function setCoords(newCoords){
    coords = newCoords;
  }

  function clearMarkerCar(){
    markerCar.setMap(null);
  }


  /* Initialize map with home marker */
  function set_map_Location(position){
    /* Create map */
    var mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    /* Add markerHome with infowindow and custom icon */
    var markerHome = new google.maps.Marker(
      {position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
        map: map,
        icon: 'https://mts.googleapis.com/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=A&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1'
      });
    latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
    
    /* Locate user position */
    var location = {'location': latlng};
    geocoder.geocode(location, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          map.setZoom(15);
          infowindow.setContent(results[0].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });

    /* Listeners for map, markerHome and click in map */
    google.maps.event.addListener(markerHome, 'click', function(){infowindow.open(map,markerHome);});
    google.maps.event.addListener(map, 'click', function(event) {
      if (markerUserClick) {
        markerUserClick.setMap(null);
        markerUserClick = null;
      }
      setCoords(event.latLng);
      createMarkerLatLng(event.latLng);
    });
  }

  /* Get user's location (HTML5) */
  function getLocation() {
    if (navigator.geolocation) {
      coords = null;
      navigator.geolocation.getCurrentPosition(set_map_Location);
    }
  }

  // Change label on map click with street location
  function changeLabel(address){
    lblPosition = document.getElementById('lblPosition');
    lblPosition.innerHTML = address;
    $('#lblPosition').show();
  }

   // A function to create the marker and set up the event window function 
   function createMarkerLatLng(latlng) {
    markerUserClick = new google.maps.Marker(
      {position: latlng, 
        icon: "https://mt.google.com/vt/icon?psize=20&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-blue.png",
        map: map, 
        zIndex: Math.round(latlng.lat()*-100000)<<5}
        );
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          map.setZoom(15);
          address = results[0].formatted_address;
          infowindow.setContent("<b>Nueva ubicación:</b><br>" + results[0].formatted_address);
          infowindow.open(map, markerUserClick);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    google.maps.event.trigger(markerUserClick, 'click');
   }

   /* Save location to DB */
   function saveLocation(){
    if(coords==null){
      $('#alertCoord').show();
    }
    if(carId==null){
      $('#alertCar').show();
    }
    if(coords!=null && carId!=null) {
      window.open("coords?&coord="+coords+"&address="+address+"&carId="+carId+"&mailOwner="+mailOwner,"_self");
    }
   }

   /* Add markers stored in DB */
   function addMarkerDB(address, description) {

    if (markerUserClick) {
      markerUserClick.setMap(null);
      markerUserClick = null;
    }

    if(address){
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var markerDB = new google.maps.Marker({
            map: map,
            draggable: true,
            position: results[0].geometry.location
          });
          var infoWindowDB = new google.maps.InfoWindow({size: new google.maps.Size(150,50)});
          infoWindowDB.setContent("<b>"+description+":</b><br>"+ results[0].formatted_address);
          setMarkerDB(markerDB);
          google.maps.event.addListener(markerDB, 'click', function(){infoWindowDB.open(map,markerDB);});
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
   }

   /* Add marker for selected car */
   function addMarkerCar(address, idCar, mailOwner){
    setMailOwner(mailOwner);
    setCarId(idCar);
    clearMarkers();
    if (markerCar) {
      markerCar.setMap(null);
      markerCar = null;
    }

    if(address!=""){
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          markerCar = new google.maps.Marker({
            map: map,
            draggable: true,
            position: results[0].geometry.location
          });
          var infoWindowCar = new google.maps.InfoWindow({size: new google.maps.Size(150,50)});
          infoWindowCar.setContent(results[0].formatted_address);
          google.maps.event.addListener(markerCar, 'click', function(){infoWindowCar.open(map,markerCar);});
          map.panTo(markerCar.getPosition());
          location.href = "#";
          location.href = "#map-canvas";
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });

      /* Show route from home to selected car */
      directionsDisplay.setMap(map);
      directionsDisplay.setOptions( { suppressMarkers: true } );
      directionsService.route({
        origin: latlng,
        destination: address,
        travelMode: google.maps.TravelMode.WALKING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });


    }
   }

   /* Show all marker stored in DB */
   function setMapOnAll() {
    for (var i = 0; i < markerDB.length; i++) {
      markerDB[i].setMap(map);
    }
    clearSelectors();
   }

   /* Clear all markers from map */
   function clearMarkers(){
    for (var i = 0; i < markerDB.length; i++) {
      markerDB[i].setMap(null);
    }
    if (markerCar){
      markerCar.setMap(null);
      markerCar = null;
    }
    if (markerUserClick) {
      markerUserClick.setMap(null);
      markerUserClick = null;
    }
    clearSelectors();
    setCarId == null;
   }  

   /* Clear and unselected all labels for select cars */
   function clearSelectors(){
    var elems = document.querySelectorAll(".radio-inline, .radio"); 
    [].forEach.call(elems, function(el) {
      el.classList.remove("checked");
    });
   }

   $(document).ready(function() {
    /* Original code from 
      http://www.avtex.com/blog/2015/02/10/bootstrap-radio-buttons-and-checkboxes-in-columns-with-contextual-text-fields/#sthash.lnw1shBp.dpuf
    */
    $('.form-group').on('click','input[type=radio]',function() {
      $(this).closest('.form-group').find('.radio-inline, .radio').removeClass('checked');
      $(this).closest('.radio-inline, .radio').addClass('checked');
    });
    $('.form-group').on('click','label[type=radio]',function() {
      $(this).closest('.form-group').find('.radio-inline, .radio').removeClass('checked');
      $(this).closest('.radio-inline, .radio').addClass('checked');
    });
    $('input[type=radio]').click(function() {
      $(this).closest('.form-group').find('.additional-info-wrap .additional-info').addClass('hide').find('input,select').val('').attr('disabled','disabled');
      if($(this).closest('.additional-info-wrap').length > 0) {
        $(this).closest('.additional-info-wrap').find('.additional-info').removeClass('hide').find('input,select').removeAttr('disabled');
      }   
    });
  }); 
