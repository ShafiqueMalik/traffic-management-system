import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import imagesData from "../../assets/images/"
import CustomMarkerComponent from "./CustomMarkerComponent/CustomMarkerComponent";
import { useSelector, useDispatch } from 'react-redux';


import { setAllMarkers, removeMarker, setCopiedMarkerElement,setSelectedImage } from 'app/slices/mapSliceTest';

export default function TrafficMap() {
    const [map, setMap] = useState(null);
    const [maps, setMaps] = useState(null);
    const {selectedImage,allMarkers} = useSelector((state) => state.mapTest)
    const dispatch = useDispatch();

    const defaultProps = {
        center: {
            lat: 59.95, lng: 30.33
        },
        zoom: 11
    };
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
        setMap(map);
        setMaps(maps);
    };
    console.log(allMarkers)
    const onMapClick = ({ x, y, lat, lng, event }) => {
        
        if (selectedImage) {
            if(selectedImage.shapeName==="marker"){
               dispatch(setAllMarkers({ ...selectedImage, location: { lat, lng } }))
            }
           dispatch(setSelectedImage(null));
        }
    }
    return (
        // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyC1h0G58c-YdqdWllmDI60_K03fpuHYO7M" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                    onClick={onMapClick}
                >
                    {allMarkers.map(m => (
                        <CustomMarkerComponent
                            lat={m.location.lat}
                            lng={m.location.lng}
                            markerData={m} />
                    ))}
                </GoogleMapReact>
            </div>
    );
}