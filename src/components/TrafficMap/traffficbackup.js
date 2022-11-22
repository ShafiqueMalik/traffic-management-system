import React from 'react'
import { GoogleMap, useJsApiLoader, KmlLayer, useLoadScript } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import roadNetworkJson from "assets/mapFiles/QLD - local government area.json";
import { setAllMarkers, removeMarker, setActiveImageId, setSelectedImage,setCopiedImage } from 'app/slices/mapSlice';
import $ from 'jquery';



import "./TrafficMap.scss"


const center = { lat: -25.363, lng: 131.044 };
let allMarkersArr = [];
let allPolylines: any = [];
let allDeletedMarkers: any = [];
let allUndoMarkers: any = [];
function TrafficMap() {
    const { selectedImage, activeImageId, allMarkers,copiedImage } = useSelector((state: any) => state.map)
    console.log(selectedImage, activeImageId, allMarkers, copiedImage)
    const dispatch = useDispatch()

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC1h0G58c-YdqdWllmDI60_K03fpuHYO7M"
    })

    const [map, setMap] = React.useState<any>(null)

    const onLoad = React.useCallback(function callback(map: any) {
        setMap(map);
        // fetch("../../assets/mapfiles/QLD - local government area.json").then(response => response.json())
        //     .then((json) => console.log(json));
        // map.data.loadGeoJson(roadNetworkJson);
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])
    const addAllMarkers = () => {
        allMarkers.forEach((m: any) => {
            m.map = map;
        })
    }
    console.log(activeImageId)
    if (activeImageId) {
        dispatch(setCopiedImage(null))
        map.setOptions({ draggableCursor: 'crosshair' });
    }
    const handleMapClick = (e: any) => {
        const { latLng } = e;
        if (selectedImage || copiedImage) {
            //this is for image marker
            if (selectedImage?.isMarker || copiedImage) {
                const getAdvanceMarkerView = () => {
                    const customHtmlElement = document.createElement("div");

                    customHtmlElement.className = "custom-marker";
                    
                    customHtmlElement.addEventListener("mouseout", function () {
                        dispatch(setActiveImageId(0))
                    });

                    if (copiedImage) {

                        customHtmlElement.setAttribute("image-id", copiedImage.getAttribute("image-id"));
                        customHtmlElement.innerHTML = `<div class="map-img-container" >
                                    <img src="${copiedImage.querySelector("img").getAttribute("src")}"  alt="${copiedImage.querySelector("img").getAttribute("src")}"/>
                                    <button class="marker-delete-btn" data-image-id="${copiedImage.getAttribute("image-id")}">X</button>
                                </div>`;
                        $(".custom-marker.active").removeClass("active");
                        customHtmlElement.addEventListener("mouseover", function () {
                            dispatch(setActiveImageId(copiedImage.getAttribute("image-id")))
                        });
                    } else {
                        customHtmlElement.setAttribute("image-id", selectedImage.id);
                        customHtmlElement.innerHTML = `<div class="map-img-container">
                                    <img src="${selectedImage.image}"  alt="${selectedImage.image}"/>
                                    <button class="marker-delete-btn" data-image-id="${selectedImage.id}">X</button>
                                </div>`;
                                customHtmlElement.addEventListener("mouseover", function () {
                                    dispatch(setActiveImageId(selectedImage?.id))
                                });
                    }

                    const markerView = new google.maps.marker.AdvancedMarkerView({
                        map,
                        position: latLng,
                        content: customHtmlElement,
                        draggable: true
                    });
                    markerView?.element?.setAttribute("image-id", selectedImage?.id??copiedImage?.getAttribute("image-id"))
                    return markerView;
                }
                const markerView = getAdvanceMarkerView();
                dispatch(setAllMarkers(markerView));
                const highlightMarker = ($marker: any) => {
                    if ($marker.classList.contains("active")) {
                        $marker.classList.remove("active")
                    } else {
                        document.querySelector("#traffic-map .custom-marker.active")?.classList?.remove("active");
                        $marker.classList.add("active");
                    }
                }

                markerView.addListener("click", (e: any) => {
                    const { target } = e.domEvent;
                    let $marker = markerView.element?.querySelector(".custom-marker");
                    // let $marker = $(target).parents(".custom-marker");
                    highlightMarker($marker);
                    allPolylines.forEach((pl: any) => pl.setEditable(false));
                    if (target.classList.contains("marker-delete-btn")) {
                        allDeletedMarkers.push(markerView);
                        markerView.map = null;
                        dispatch(setActiveImageId(0))
                    }
                    $(document).off("keydown").on("keydown", function (e: any) {
                        let isMarkerSelected = !!markerView.element?.querySelector(".custom-marker.active");

                        if (e.key == "Delete") {
                            if (isMarkerSelected) {
                                allDeletedMarkers.push(markerView);
                                dispatch(removeMarker(markerView))
                                markerView.map = null;
                            }
                        }
                        if (e.ctrlKey && e.key === 'z') {
                            if (allDeletedMarkers.length) {
                                let marker = allDeletedMarkers.pop();
                                allUndoMarkers.push(marker);
                                marker.element.querySelector(".custom-marker").classList.remove("active")
                                marker.map = map;
                            }
                        }
                        if (e.ctrlKey && e.key === 'y') {
                            if (allUndoMarkers.length) {
                                let marker = allUndoMarkers.pop();
                                allDeletedMarkers.push(marker);
                                marker.element.querySelector(".custom-marker").classList.remove("active")

                                marker.map = null;
                            }
                        }
                        if (e.ctrlKey && e.key === "c") {
                            if (isMarkerSelected) {
                                map?.setOptions({ draggableCursor: 'copy' });
                                let copy = markerView.element?.querySelector(".custom-marker");
                                console.log({copy})
                                dispatch(setCopiedImage(copy))
                            }

                        }
                    });


                    //delete marker
                    // $(document).off("keydown").on("keydown", function (e) {
                    //     //delete key
                    //     let isMarkerSelected = !!$(markerView.element).find(".custom-marker.active").length;
                    //     if (e.keyCode == 46) {
                    //         if (isMarkerSelected) {
                    //             allDeletedMarkers.push(markerView);
                    //             markerView.map = null;
                    //         }
                    //     }
                    //     if (e.ctrlKey && e.key === 'z') {
                    //         if (allDeletedMarkers.length) {
                    //             let marker = allDeletedMarkers.pop();
                    //             allUndoMarkers.push(marker);
                    //             $(marker.element).find(".custom-marker").removeClass("active")
                    //             marker.map = map;
                    //         }
                    //     }
                    //     if (e.ctrlKey && e.key === 'y') {
                    //         if (allUndoMarkers.length) {
                    //             let marker = allUndoMarkers.pop();
                    //             allDeletedMarkers.push(marker);
                    //             $(marker.element).find(".custom-marker").removeClass("active")
                    //             marker.map = null;
                    //         }
                    //     }
                    //     if (e.ctrlKey && e.key === "c") {
                    //         if (isMarkerSelected) {
                    //             map.setOptions({ draggableCursor: 'copy' });
                    //             $copiedCustomMarker = $(markerView.element).find(".custom-marker");
                    //         }

                    //     }
                    // })
                });
                if(activeImageId){
                    dispatch(setActiveImageId(null));
                }
                if(selectedImage){
                    dispatch(setSelectedImage(null));
                }
            } else {//create polyline
                console.log("poly")

            }
        }
    }
    return isLoaded ? (
        <>
            <button onClick={addAllMarkers}>CLICK ME</button>
            <GoogleMap
                id='traffic-map'
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
                options={{ mapId: "891007a81bf3432e", mapTypeId: "satellite" }}
            >
                { /* Child components, such as markers, info windows, etc. */}
                {/* <KmlLayer url="https://e762c6ab-5e8e-4d5f-825c-f5add6d6c27f.usrfiles.com/ugd/e762c6_f150ef60ff424ef3a8636a1093fb45d3.kml" /> */}
                <></>
            </GoogleMap>
        </>
    ) : <></>
}

export default React.memo(TrafficMap)