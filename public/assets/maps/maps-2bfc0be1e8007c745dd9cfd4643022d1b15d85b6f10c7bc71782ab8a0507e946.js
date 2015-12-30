 <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAVdlyqpDfn1sXmYcY9WJS4cfU0jnkIWao&sensor=false">
 </script>
 <script type="text/javascript">

  function getLocation(){
    if (navigator.geolocation){
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition(success, error,options);
    }

    else{ x.innerHTML= "Geolocation is not supported by this browser."; }
  }

  function error(e) {
    console.log("error code:" + e.code + 'message: ' + e.message );
  }


  function success(position) {
    var  lat  = position.coords.latitude;
    var  lng =  position.coords.longitude;

    var  myLocation =   new google.maps.LatLng(lat, lng);

    var mapOptions = {
      center: new google.maps.LatLng(myLocation.lat(),myLocation.lng()),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    var marker = new google.maps.Marker({
      position: myLocation,
      map: map,
      title:"you are here"
    });
  }

  //google.maps.event.addDomListener(window, 'load', getLocation() );

 </script>
