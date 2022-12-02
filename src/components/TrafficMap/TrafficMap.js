import React, { useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Autocomplete, KmlLayer, useLoadScript } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import roadNetworkJson from "assets/mapFiles/QLD - local government area.json";
import { setAllMarkers, removeMarker, setCopiedMarkerElement } from 'app/slices/mapSlice';
import $ from 'jquery';



import "./TrafficMap.scss"
import { Box, Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import PolylineDistanceMapTopInput from './PolylineDistanceMapTopInput/PolylineDistanceMapTopInput';


const center = { lat: -25.363, lng: 131.044 };
let allDeletedMarkers = [];
let allUndoMarkers = [];

//polyline variables
let currentPolyline;
let allPolylines = [];
let allDeletedPolylines = [];
var landmarks = [];
let polylineImage;
let allUndoPolylines = [];
let allDeletedPaths = [];
let autocomplete = null;
let polylineMarkerDistance = 2000;


function TrafficMap() {
    const { selectedImage, allMarkers, copiedCustomMarkerElement } = useSelector((state) => state.map)
    const dispatch = useDispatch()
    console.log("allMarkers:", allMarkers);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC1h0G58c-YdqdWllmDI60_K03fpuHYO7M"
    })

    const [map, setMap] = React.useState(null)
    const [distanceFieldError, setDistanceFieldError] = React.useState(false)

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
        // Create the search box and link it to the UI element.
        // const input = document.getElementById("search-map-input");

        // const searchBox = new window.google.maps.places.SearchBox(input);

        // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

        if (!copiedCustomMarkerElement) {
            map.setOptions({ draggableCursor: 'crosshair' });
        }

        var drawingManager = new window.google.maps.drawing.DrawingManager({
            drawingControllOptions: {
                position: window.google.maps.ControlPosition.CENTER_TOP,
                drawingModes: [
                    window.google.maps.drawing.OverlayType.POLYGON,
                ]
            },
            // map,
            polygonOptions: {
                clickable: true,
                draggable: true,
                editable: true,
                showSegmentLength: true,
                //fill
                fillcolor: "#FF0000",
                fillOpacity: 0.5,
                //strocke
                strockColor: "#FF0000",
                strockeWeight: 5,
            },

        });




        // **DISPLAY LAYERS (POLYGONS)**
        // map.data.loadGeoJson(process.env.PUBLIC_URL+"/mapFiles/QLD - suburb.json");
        // map.data.loadGeoJson(process.env.PUBLIC_URL+"/mapFiles/QLD - local government area.json");
        // map.data.loadGeoJson(process.env.PUBLIC_URL+"/mapFiles/QLD - main roads network.json");
        map.data.loadGeoJson(process.env.PUBLIC_URL + "/LOCAL_GOVERNMENT_AREA_LGA_Australian Capital territory.geojson");
        //
        // I would like to be able to have different colour for each layer.
        // Lets say suburb = red / local government area = blue / main roads = green


        let colors = {
            roads: "green",//polyline
            roadsHover: "green",
            localGovt: "blue",//polygon
            localGovtHover: "blue",
            suburb: "red",//polygon
            suburbHover: "red",
        };

        map.data.setStyle((feature) => {

            let color = "gray";
            let zIndex = 1000;
            if (feature?.j?.altitudeMode === "clampToGround") {
                color = colors.roads;
                zIndex = 5000;
            } else if (feature?.m?.includes("ckan_16803f0b_6934_41ae_bf82_d16265784c7f")) {
                color = colors.localGovt;
                // zIndex = 4000;
            } else if (feature?.m?.includes("ckan_6bedcb55_1b1f_457b_b092_58e88952e9f0")) {
                color = colors.suburb;
                // zIndex = 3000;
            }
            if (feature.getProperty("isColorful")) {
                color = feature.getProperty("color");
                // zIndex = 2000;
            }
            return /** @type {!window.google.maps.Data.StyleOptions} */ {
                fillColor: color,
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                zIndex
            };
        });
        map.data.addListener("mouseover", (event) => {
            map.data.revertStyle();
            let color = "gray";

            if (event?.feature?.j?.altitudeMode === "clampToGround") {
                color = colors.roadsHover;
            } else if (event?.feature?.m?.includes("ckan_16803f0b_6934_41ae_bf82_d16265784c7f")) {
                color = colors.localGovtHover;
            } else if (event?.feature?.m?.includes("ckan_6bedcb55_1b1f_457b_b092_58e88952e9f0")) {
                color = colors.suburbHover;
            }
            map.data.overrideStyle(event.feature, {
                strokeWeight: 8,
                fillOpacity: 0.8,
                fillColor: color,
            });
        });

        map.data.addListener("mouseout", (event) => {
            map.data.revertStyle();
        });


        // **DISPLAY MARKERS - QPS STATIONS**
        // var qpsSTATIONS = new window.google.maps.KmlLayer({
        //     url: 'https://e762c6ab-5e8e-4d5f-825c-f5add6d6c27f.usrfiles.com/ugd/e762c6_f150ef60ff424ef3a8636a1093fb45d3.kml',
        //     map,
        // });
    }, []);
    if (!copiedCustomMarkerElement) {
        map?.setOptions({ draggableCursor: 'crosshair' });
    }
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);
    const handleMapClick = (event) => {
        function getAdvanceMarkerView(map, latLng) {
            let $selectImg = $(".right-sidebar-content img.sign-img.active");
            const customHtmlElement = document.createElement("div");

            customHtmlElement.className = "custom-marker";
            if (copiedCustomMarkerElement) {
                customHtmlElement.setAttribute("imageId", copiedCustomMarkerElement?.attr("imageId"));
                customHtmlElement.innerHTML = `<div class="map-img-container" >
                            <img id="marker-img" src="${copiedCustomMarkerElement?.find("img").attr("src")}"  alt="${copiedCustomMarkerElement?.find("img").attr("src")}"/>
                            <button class="marker-delete-btn" data-image-id="${copiedCustomMarkerElement?.attr("imageId")}">X</button>
                        </div>`;
                $(".custom-marker.active").removeClass("active");
            } else {
                customHtmlElement.setAttribute("imageId", $selectImg?.attr("data-image-id") ?? "");
                customHtmlElement.innerHTML = `<div class="map-img-container" >
                            <img id="marker-img" src="${$selectImg.attr("src")}"  alt="${$selectImg.attr("src")}"/>
                            <button class="marker-delete-btn" data-image-id="${$selectImg.attr("data-image-id")}">X</button>
                            <div class="custom-marker-context-menu">
                                <div class="custom-marker-context-menu-item delete-icon" >
                                   <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                </div>
                                <div class="custom-marker-context-menu-item edit-icon" >
                                   <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                                </div>
                            </div>
                        </div>`;
            }

            const markerView = new window.google.maps.marker.AdvancedMarkerView({
                map,
                position: { lat: latLng.lat(), lng: latLng.lng() },
                content: customHtmlElement,
                draggable: true
            });
            console.log(markerView.position.lat, markerView.position.lng);
            return markerView;
        }
        //polyline
        function deleteMarkerOnPolyline(markerImg, currentPoly) {
            if (landmarks.length && (landmarks.length > 0)) {
                for (var i = 0; i < landmarks.length; i++) {
                    if (currentPoly?.id === landmarks[i]?.id) {
                        landmarks[i]?.setMap(null)
                    }
                }
            }
        }


        function addMarkerOnPolyline(markerImg, currentPoly) {
            if (landmarks.length && (landmarks.length > 0)) {
                for (var i = 0; i < landmarks.length; i++) {
                    if (currentPoly?.id === landmarks[i]?.id) {
                        landmarks[i]?.setMap(null)
                    }
                }
            }
            console.log(polylineMarkerDistance)
            for (var i = 0; i < currentPoly.Distance(); i += polylineMarkerDistance) {
                var km_point = currentPoly.GetPointAtDistance(i);
                if (km_point) {
                    var infoWindowContent = "marker " + i / 2000 + " of " + Math.floor(currentPoly.Distance() / 2000) + "<br>kilometer " + i / 1000 + " of " + (currentPoly.Distance() / 1000).toFixed(2);
                    var landmark = createMarker(km_point, infoWindowContent, markerImg, currentPoly);
                    landmarks.push(landmark);
                }
            }
        }
        function createMarker(point, html, markerImg, currentPoly) {
            var contentString = html;
            var marker = new window.google.maps.Marker({
                position: point,
                // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                map: map,
                icon: {
                    url: markerImg,
                    scaledSize: new window.google.maps.Size(15, 30),
                },
                id: currentPoly.id,
                zIndex: Math.round(point.lat() * -100000) << 5
            });

            return marker;
        }

        if ($(".right-sidebar-content img.sign-polyline.active")?.length > 0) {
            let $selectedImg = $(".right-sidebar-content img.sign-polyline");
            //**CREATE POLYLINE** 
            if (!currentPolyline) {
                currentPolyline = new window.google.maps.Polyline({
                    clickable: true,
                    draggable: true,
                    editable: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 10,
                    id: Date.now()

                });
                currentPolyline.setMap(map);
                allPolylines.push(currentPolyline);

                $("#polyline-distance-input").show();

                var polylineDoubleClick = function (e) {
                    console.log("Double Click");
                    e.stop();
                    if (currentPolyline?.editable) {
                        currentPolyline.setEditable(false);
                        currentPolyline = undefined;
                        $("#polyline-distance-input").hide();
                    } else {
                        this.setEditable(true);
                        currentPolyline = this;
                        allMarkers.forEach((marker) => {
                            $(marker.element).find(".custom-marker").removeClass("active")
                        });
                        $("#polyline-distance-input").show();
                    }
                    $(document).off("keydown").on("keydown", function (e) {
                        //delete key
                        if (e.key == "Delete") {
                            allDeletedPolylines.push(currentPolyline);
                            deleteMarkerOnPolyline(polylineImage, currentPolyline);

                            currentPolyline.setMap(null);
                            currentPolyline = undefined;
                        }

                        if (e.ctrlKey && e.key === 'z') {
                            if (allDeletedPolylines.length && !currentPolyline?.editable) {
                                let deletedPolyline = allDeletedPolylines?.pop();
                                deletedPolyline?.setMap(map);
                                deletedPolyline.setEditable(false);

                                allUndoPolylines.push(deletedPolyline);
                                addMarkerOnPolyline(polylineImage, deletedPolyline);
                                // currentPolyline = deletedPolyline;
                                currentPolyline?.setEditable(false);
                                currentPolyline = undefined;

                            } else {
                                if (currentPolyline?.editable) {
                                    var path = currentPolyline.getPath();
                                    let p = path.pop()


                                    //path redo
                                    let found = false;
                                    allDeletedPaths.forEach((item) => {
                                        if (item.deletePolyline.id === currentPolyline.id) {
                                            found = true;
                                            item.deletedPath.push(p);
                                        }
                                    });
                                    if (!allDeletedPaths.length || !found) {
                                        allDeletedPaths.push({
                                            deletePolyline: currentPolyline,
                                            deletedPath: [p]
                                        })
                                    }
                                    console.log(allDeletedPaths)
                                }
                            }
                        }
                        if (e.ctrlKey && e.key === 'y') {
                            //redo entire polyline
                            if (!currentPolyline?.editable) {
                                let pl = allUndoPolylines.pop();
                                console.log(pl)
                                allDeletedPolylines.push(pl);
                                deleteMarkerOnPolyline(polylineImage, pl);

                                pl.setMap(null);
                            } else {
                                allDeletedPaths.forEach((item) => {
                                    if (item.deletePolyline.id === currentPolyline.id) {
                                        if (item.deletedPath.length) {
                                            let p = item.deletedPath.pop();
                                            var path = currentPolyline.getPath();
                                            path.push(p);
                                        }
                                    }
                                });
                            }


                        }
                    });


                }

                var getPath = function () {
                    if (currentPolyline.editable) {
                        addMarkerOnPolyline(polylineImage, currentPolyline);
                    }
                }
                window.google.maps.event.addListener(currentPolyline, "dragend", getPath);
                window.google.maps.event.addListener(currentPolyline.getPath(), "insert_at", getPath);
                window.google.maps.event.addListener(currentPolyline.getPath(), "remove_at", getPath);
                window.google.maps.event.addListener(currentPolyline.getPath(), "set_at", getPath);
                window.google.maps.event.addListener(currentPolyline, "dblclick", polylineDoubleClick);


            }
            if (currentPolyline?.editable) {

                var path = currentPolyline.getPath();
                path.push(event.latLng);
                $(document).off("keydown").on("keydown", function (e) {
                    //delete polyline
                    if (e.key == "Delete") {
                        allDeletedPolylines.push(currentPolyline);
                        deleteMarkerOnPolyline(polylineImage, currentPolyline);

                        currentPolyline.setMap(null);
                        currentPolyline = undefined;
                    }

                    if (e.ctrlKey && e.key === 'z') {
                        if (allDeletedPolylines.length && !currentPolyline?.editable) {
                            let deletedPolyline = allDeletedPolylines?.pop();
                            deletedPolyline?.setMap(map);
                            deletedPolyline.setEditable(false);
                            allUndoPolylines.push(deletedPolyline);
                            addMarkerOnPolyline(polylineImage, deletedPolyline);
                            currentPolyline?.setEditable(false);
                            currentPolyline = undefined;

                        } else {
                            if (currentPolyline?.editable) {
                                var path = currentPolyline.getPath();
                                let p = path.pop()


                                //path redo
                                let found = false;
                                allDeletedPaths.forEach((item) => {
                                    if (item.deletePolyline.id === currentPolyline.id) {
                                        found = true;
                                        item.deletedPath.push(p);
                                    }
                                });
                                if (!allDeletedPaths.length || !found) {
                                    allDeletedPaths.push({
                                        deletePolyline: currentPolyline,
                                        deletedPath: [p]
                                    })
                                }
                                console.log(allDeletedPaths)
                            }
                        }
                    }
                    if (e.ctrlKey && e.key === 'y') {
                        //redo entire polyline
                        if (!currentPolyline?.editable) {
                            let pl = allUndoPolylines.pop();
                            console.log(pl)
                            allDeletedPolylines.push(pl);
                            deleteMarkerOnPolyline(polylineImage, pl);

                            pl.setMap(null);
                        } else {
                            allDeletedPaths.forEach((item) => {
                                if (item.deletePolyline.id === currentPolyline.id) {
                                    if (item.deletedPath.length) {
                                        let p = item.deletedPath.pop();
                                        var path = currentPolyline.getPath();
                                        path.push(p);
                                    }
                                }
                            });
                        }


                    }

                });

                var image = {
                    url: "https://static.wixstatic.com/media/e762c6_9aa5bd4cd22d40b8acd0ea98b86a715b~mv2.png",
                    scaledSize: new window.google.maps.Size(15, 30),
                }
                if (!polylineImage) {
                    polylineImage = $selectedImg.attr("src");
                }
                addMarkerOnPolyline(polylineImage, currentPolyline);
            }

            $("#polyline-distance-input #set-distance-btn").off("click").on("click", function () {
                let distance = +$("#distance-input").val();
                console.log(distance);
                if (distance) {
                    if (distance > 0 && distance < 31) {
                        setDistanceFieldError(false);
                        polylineMarkerDistance = distance;
                        addMarkerOnPolyline(polylineImage, currentPolyline)
                    } else {
                        setDistanceFieldError(true);
                    }
                }else{
                    setDistanceFieldError(true);
                }

            });
        }
        else if ($(".right-sidebar-content img.sign-img.active")?.length > 0 || copiedCustomMarkerElement) {
            //adding marker

            let { latLng } = event;
            const markerView = getAdvanceMarkerView(map, latLng);
            console.log(markerView)
            // allMarkers.push(markerView);
            dispatch(setAllMarkers(markerView));
            const highlightMarker = ($marker) => {
                if ($marker.hasClass("active")) {
                    $marker.removeClass("active")
                } else {
                    $("#traffic-map .custom-marker").removeClass("active");
                    $marker.addClass("active");
                }
            }

            markerView.addListener("click", ({ domEvent, latLng }) => {
                const { target } = domEvent;
                console.log(target)
                let $marker = $(target).parents(".custom-marker");
                highlightMarker($marker);
                console.log(markerView)
                allPolylines.forEach((pl) => pl.setEditable(false));
                if ($(target).hasClass("marker-delete-btn") || $(target).closest(".delete-icon").length > 0) {
                    allDeletedMarkers.push(markerView);
                    dispatch(removeMarker(markerView));

                    markerView.map = null;
                    $(".right-sidebar-content img.sign-img").removeClass("active");
                }
                else if ($(target).closest(".edit-icon").length > 0) {
                    alert("edit clicked");
                }


                //delete marker
                $(document).off("keydown").on("keydown", function (e) {
                    //delete key
                    let isMarkerSelected = !!markerView?.element?.querySelector(".custom-marker.active");
                    if (e.key == "Delete") {
                        if (isMarkerSelected) {
                            allDeletedMarkers.push(markerView);
                            dispatch(removeMarker(markerView));
                            markerView.map = null;
                        }
                    }
                    if (e.ctrlKey && e.key === 'z') {
                        if (allDeletedMarkers.length) {
                            let marker = allDeletedMarkers.pop();
                            dispatch(setAllMarkers(marker));
                            allUndoMarkers.push(marker);
                            $(marker.element).find(".custom-marker").removeClass("active")
                            marker.map = map;
                        }
                    }
                    if (e.ctrlKey && e.key === 'y') {
                        if (allUndoMarkers.length) {
                            let marker = allUndoMarkers.pop();
                            dispatch(removeMarker(marker));
                            allDeletedMarkers.push(marker);
                            $(marker.element).find(".custom-marker").removeClass("active")
                            marker.map = null;
                        }
                    }
                    if (e.ctrlKey && e.key === "c") {
                        if (isMarkerSelected) {
                            map.setOptions({ draggableCursor: 'copy' });
                            let copiedCustomMarker = markerView?.element?.querySelector(".custom-marker") ?? {};
                            dispatch(setCopiedMarkerElement($(copiedCustomMarker)))
                        }

                    }
                })
            });

            $(document).on("mouseover", ".custom-marker", function () {
                let imageId = $(this).attr("imageId");
                $(".right-sidebar-content img.sign-img").each(function () {
                    if ($(this).attr("data-image-id") === imageId) {
                        $(this).addClass("active");
                    }
                })
            })
            $(document).on("mouseleave", ".custom-marker", function () {
                $(".right-sidebar-content img.sign-img").removeClass("active");
            });




            $(".right-sidebar-content img.sign-img").removeClass("active")
        }

    }
    // const [autocomplete, setAutocomplete] = useState(null)

    const onAutocompleteLoad = (ac) => {
        autocomplete = ac
    }
    const handlePlaceChanged = () => {
        console.log(autocomplete?.getPlace());
        let location = autocomplete?.getPlace()?.geometry?.location;
        map.setCenter(location)
        // map.panTo(location)
    }

    // useEffect(()=>{
    //     $("#undo-btn").off("click").on("click", function () {
    //         document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'z', 'ctrlKey': true }));
    //     });
    //     $("#redo-btn").off("click").on("click", function () {
    //         document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'y', 'ctrlKey': true }));
    //     });
    // },[]);
    const saveDataToLocalStore = () => {
        const data = allMarkers.map((m) => ({
            imageId: m.element.querySelector(".custom-marker").getAttribute("imageId"),
            imageSrc: m.element.querySelector("#marker-img").getAttribute("src"),
            position: { lat: m.position.lat, lng: m.position.lng }
        }));
        console.log(data);
        localStorage.setItem("markerData", JSON.stringify(data));
    }
    // useEffect(()=>{
    //    setTimeout(()=>{
    //     const data =JSON.parse(localStorage.getItem("markerData"));
    //     data?.forEach(marker=>{
    //         const customHtmlElement = document.createElement("div");

    //         customHtmlElement.className = "custom-marker";

    //             customHtmlElement.setAttribute("imageId", marker.imageId);
    //             customHtmlElement.innerHTML = `<div class="map-img-container" >
    //                         <img id="marker-img" src="${marker.imageSrc}"  alt="image ${marker.imageId}"/>
    //                         <button class="marker-delete-btn" data-image-id="${marker.imageId}">X</button>
    //                     </div>`;

    //         const markerView = new window.google.maps.marker.AdvancedMarkerView({
    //             map,
    //             position: marker.position,
    //             content: customHtmlElement,
    //             draggable: true
    //         });
    //     })

    //    },10)
    // },[map])
    console.log(distanceFieldError)
    return isLoaded ? (
        <Box position="relative">
            {/* <button onClick={saveDataToLocalStore}>Save</button> */}
            {/* <Box
                id="search-map-input"
                className="controls"
                type="text"
                placeholder="Search..."
            /> */}
            <PolylineDistanceMapTopInput distanceFieldError={distanceFieldError} />
            <GoogleMap
                id='traffic-map'
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
                options={{ mapId: "891007a81bf3432e", mapTypeId: "satellite",mapTypeControl: false, }}
            >
                <Box sx={{ "& .pac-target-input": { top: "10px" } }}>
                    <Autocomplete
                        onLoad={onAutocompleteLoad}
                        onPlaceChanged={handlePlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Enter Location"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "10px",
                                top:"20px"
                            }}
                        />
                    </Autocomplete>

                </Box>
                { /* Child components, such as markers, info windows, etc. */}
                {/* <KmlLayer url="https://e762c6ab-5e8e-4d5f-825c-f5add6d6c27f.usrfiles.com/ugd/e762c6_f150ef60ff424ef3a8636a1093fb45d3.kml" /> */}
                <></>
            </GoogleMap>
        </Box>
    ) : <></>
}

export default React.memo(TrafficMap)