  <script type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAVdlyqpDfn1sXmYcY9WJS4cfU0jnkIWao&sensor=false">
  </script>
  <script type="text/javascript">
  function set_map(state, city){
    var mapOptions = {
      center: new google.maps.LatLng(25.687944,-100.309403),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    if(state == ""){
      address = city;
    }else{
      address = state + ',' + city;
    }

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      'address':address
    },

    function(result, status){
      if (status == google.maps.GeocoderStatus.OK){
        map.setCenter(result[0].geometry.location);

        var marker = new google.maps.Marker({
          map: map,
          position: result[0].geometry.location
        });
      }else{
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
    return false;
  }

  $(document).ready(function(){
    set_map('DC', 'Washington');
  })
  </script>