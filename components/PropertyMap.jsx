"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { setDefaults, fromAddress } from "react-geocode";
import { useEffect, useState } from "react";
import MiniSpinner from "./MiniSpinner";
import Map, { Marker } from "react-map-gl";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

function PropertyMap({ property }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(function () {
    async function fetchCoords() {
      try {
        setIsLoading(true);
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        console.log(res);
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport((view) => {
          return { ...view, latitude: lat, longitude: lng };
        });
        setIsLoading(false);
      } catch (error) {
        console.error("fetchCoords error:", error);
      }
    }
    if (!lat && !lng) fetchCoords().catch((e) => console.log(e));
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <MiniSpinner />
      </div>
    );

  // console.log("data: ", lat, lng, viewport);

  if (!isLoading && lat && lng)
    return (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    );
}

export default PropertyMap;
