import React, { useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Autocomplete, KmlLayer, useLoadScript } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import roadNetworkJson from "assets/mapFiles/QLD - local government area.json";
import { setAllMarkers, removeMarker, setCopiedMarkerElement } from 'app/slices/mapSlice';
import $ from 'jquery';



import "./TrafficMap.scss"
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import PolylineDistanceMapTopInput from './PolylineDistanceMapTopInput/PolylineDistanceMapTopInput';

import logoWhite100 from "assets/images/logo-white100.png";
import WhiteLogo from 'components/WhiteLogo/WhiteLogo';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AutocompleteRoundedField from 'components/AutocompleteRoundedField/AutocompleteRoundedField';
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
                // $(customHtmlElement).find(".map-img-container").append(copiedCustomMarkerElement.find(".custom-marker-context-menu").clone())
            } else {
                customHtmlElement.setAttribute("imageId", $selectImg?.attr("data-image-id") ?? "");
                customHtmlElement.innerHTML = `<div class="map-img-container" >
                            <img id="marker-img" src="${$selectImg.attr("src")}"  alt="${$selectImg.attr("src")}"/>
                            <button class="marker-delete-btn" data-image-id="${$selectImg.attr("data-image-id")}">X</button>
                            <div class="custom-marker-context-menu">
                                <div class="custom-marker-context-menu-item " >
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path></svg>
                                    <span>Note</span>
                                </div>
                                <div class="custom-marker-context-menu-item " >
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M16 18v2H5v-2h11zm5-7v2H3v-2h18zm-2-7v2H8V4h11z"></path></g></svg>
                                    <span>Arrange</span>
                                </div>
                                <div class="custom-marker-context-menu-item " >
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path></svg> 
                                    <span>Ctrl + C</span>
                                </div>
                                <div class="custom-marker-context-menu-item " >
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path fill-rule="nonzero" d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zM4 16v3h16v-3H4zm0-2h16V5H4v9z"></path></g></svg>
                                    <span>Edit Panel</span>
                                </div>
                                <div class="custom-marker-context-menu-item " >
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"></path></svg>
                                    <span>Flip</span>
                                </div>
                                <div class="custom-marker-context-menu-item delete-icon" >
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"></path></g></svg>
                                    <span>Delete</span>
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
                } else {
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
                        console.log("COPY")

                        if (isMarkerSelected) {
                            map.setOptions({ draggableCursor: 'copy' });
                            console.log(markerView)
                            console.log(markerView?.element)
                            let copiedCustomMarker =$(markerView?.element?.querySelector(".custom-marker"))?.clone() ?? {};
                            console.log(copiedCustomMarker)
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
            {/* <Box component="img" src={logoWhite100} alt="logo white 100"
                sx={{
                    position: "absolute",
                    top: "20px",
                    right: "100px",
                    width: "185px",
                    height: "40px",
                    zIndex: 1,
                    filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.5))"
                }}
            /> */}
            <WhiteLogo
                sx={{
                    position: "absolute",
                    top: "20px",
                    right: "70px",
                    width: "185px",
                    height: "40px",
                    zIndex: 1,
                    filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.5))"
                }}
            />
            <PolylineDistanceMapTopInput distanceFieldError={distanceFieldError} />
            <GoogleMap
                id='traffic-map'
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
                options={{ mapId: "891007a81bf3432e", mapTypeId: "satellite", mapTypeControl: false, }}
            >
                <Box className="autocomplete-input-container" sx={{
                    position: "absolute",
                    top: "20px",
                    left: "15px",
                    "& .pac-target-input": { top: "15px" }
                }}>
                    <AutocompleteRoundedField map={map} />
                </Box>
                { /* Child components, such as markers, info windows, etc. */}
                {/* <KmlLayer url="https://e762c6ab-5e8e-4d5f-825c-f5add6d6c27f.usrfiles.com/ugd/e762c6_f150ef60ff424ef3a8636a1093fb45d3.kml" /> */}
                <></>
            </GoogleMap>
        </Box>
    ) : <></>
}

export default React.memo(TrafficMap)