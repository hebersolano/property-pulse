"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl/dist/esm/components/map";
import { setDefaults, fromAddress } from "react-geocode";
import { useEffect, useState } from "react";

function PropertyMap({ property }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "us", // Default region for responses.
  });

  const { street, city, state, zipcode } = property.location;

  useEffect(
    function () {
      async function fetchCoords() {
        const res = await fromAddress(`${street} ${city} ${state} ${zipcode}`);
        const { lat, lng } = res.results[0].geometry.location;
        console.log(lat, lng);
      }
      fetchCoords();
    },
    [street, city, state, zipcode]
  );

  return <div>MapBox Map</div>;
}

export default PropertyMap;
