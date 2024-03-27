import React, { useState, useEffect } from 'react';
import './App.css';
import Map, {GeolocateControl} from 'react-map-gl';
import GeocoderControl from './GeocoderControl';


function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures this is only run once


  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 14
        }}
        style={{width: '100%', height: "100vh"}}
        mapStyle="mapbox://styles/subaiyalshk/clu9dc7cw01l201qqdw27ep6d"
      >
        <GeolocateControl position='bottom-right'/>
        <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY} position="top-left" />
      </Map>
    </div>
  );
}

export default App;
