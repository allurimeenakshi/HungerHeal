import  { useEffect } from "react";
import "./Track.css";

const MapComponent = () => {
  useEffect(() => {
    // Load GoMaps API dynamically
    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => initMap();
    };

    // Initialize Google Map (or GoMaps if compatible)
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 }, // Default: Sydney
        zoom: 13,
      });

      const input = document.getElementById("pac-input");
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log("No details available for the input: " + place.name);
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        new window.google.maps.Marker({
          position: place.geometry.location,
          map: map,
        });
      });
    };

   
    loadScript(
      "https://maps.gomaps.pro/maps/api/js?key=AlzaSytDG7xEKGYtc8a07v_2vNdkilEieqw40Kb&libraries=places&callback=initMap"
    );
  }, []);

  return (
    <div className="map-container">
      <input id="pac-input" type="text" placeholder="Search for a place" />
      <div id="map"></div>
    </div>
  );
};

export default MapComponent;