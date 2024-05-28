"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { setDefaults, fromAddress } from "react-geocode";
import { useEffect, useState } from "react";
import MiniSpinner from "./MiniSpinner";
import mapboxgl from "mapbox-gl";
import Map from "react-map-gl";

function PropertyMap({ property }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: 500,
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
        try {
          setIsLoading(true);
          const res = await fromAddress(
            `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
          );
          const { lat, lng } = res.results[0].geometry.location;
          setLat(lat);
          setLng(lng);
          setViewport({ ...viewport, latitude: lat, longitude: lng });
          setIsLoading(false);
        } catch (error) {
          console.error("fetchCoords error:", error);
        }
      }
      fetchCoords().catch((e) => console.log(e));
    },
    [viewport, property.location]
  );

  if (isLoading)
    return (
      <div className="flex justify-center">
        <MiniSpinner />
      </div>
    );

  console.log("data: ", lat, lng, viewport);

  if (!isLoading)
    return (
      <Map
      // mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      // mapLib={mapboxgl}
      // initialViewState={{
      //   latitude: lng,
      //   longitude: lat,
      //   zoom: 15,
      // }}
      // style={{ width: "100%", height: 500 }}
      // mapStyle="mapbox://styles/mapbox/streets-v12"
      />
    );
}

export default PropertyMap;
