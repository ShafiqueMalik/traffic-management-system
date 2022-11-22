import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader, KmlLayer, useLoadScript } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import roadNetworkJson from "assets/mapFiles/QLD - local government area.json";
import { setAllMarkers, removeMarker, setCopiedMarkerElement } from 'app/slices/mapSlice';
import $ from 'jquery';



import "./TrafficMap.scss"


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



function TrafficMap() {
    const { selectedImage, allMarkers, copiedCustomMarkerElement } = useSelector((state) => state.map)
    const dispatch = useDispatch()
    console.log("allMarkers:", allMarkers);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC1h0G58c-YdqdWllmDI60_K03fpuHYO7M"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
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
            map,
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
                            <img src="${copiedCustomMarkerElement?.find("img").attr("src")}"  alt="${copiedCustomMarkerElement?.find("img").attr("src")}"/>
                            <button class="marker-delete-btn" data-image-id="${copiedCustomMarkerElement?.attr("imageId")}">X</button>
                        </div>`;
                $(".custom-marker.active").removeClass("active");
            } else {
                customHtmlElement.setAttribute("imageId", $selectImg?.attr("data-image-id") ?? "");
                customHtmlElement.innerHTML = `<div class="map-img-container" >
                            <img src="${$selectImg.attr("src")}"  alt="${$selectImg.attr("src")}"/>
                            <button class="marker-delete-btn" data-image-id="${$selectImg.attr("data-image-id")}">X</button>
                        </div>`;
            }

            const markerView = new window.google.maps.marker.AdvancedMarkerView({
                map,
                position: latLng,
                content: customHtmlElement,
                draggable: true
            });
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
            for (var i = 0; i < currentPoly.Distance(); i += 2000) {
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
            console.log($selectedImg)
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


                var polylineDoubleClick = function (e) {
                    console.log("Double Click")
                    e.stop();
                    if (currentPolyline?.editable) {
                        currentPolyline.setEditable(false);
                        currentPolyline = undefined;

                    } else {
                        this.setEditable(true);
                        currentPolyline = this;
                        allMarkers.forEach((marker) => {
                            $(marker.element).find(".custom-marker").removeClass("active")
                        })

                    }
                    $(document).off("keydown").on("keydown", function (e) {
                        //delete key
                        if (e.keyCode == 46) {
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
                    //delete key
                    // if (e.ctrlKey && e.key === 'z') {

                    //     //path redo
                    //     if (currentPolyline?.editable) {
                    //         let p = path.pop();

                    //         let found = false;
                    //         allDeletedPaths.forEach((item) => {
                    //             if (item.deletePolyline.id === currentPolyline.id) {
                    //                 found = true;
                    //                 item.deletedPath.push(p);
                    //             }
                    //         });
                    //         if (!allDeletedPaths.length || !found) {
                    //             allDeletedPaths.push({
                    //                 deletePolyline: currentPolyline,
                    //                 deletedPath: [p]
                    //             })
                    //         }
                    //         console.log(allDeletedPaths)
                    //     }
                    // }




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
                let $marker = $(target).parents(".custom-marker");
                highlightMarker($marker);
                console.log(markerView)
                allPolylines.forEach((pl) => pl.setEditable(false));
                if ($(target).hasClass("marker-delete-btn")) {
                    allDeletedMarkers.push(markerView);
                    dispatch(removeMarker(markerView));

                    markerView.map = null;
                    $(".right-sidebar-content img.sign-img").removeClass("active");
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

    // useEffect(()=>{
    //     $("#undo-btn").off("click").on("click", function () {
    //         document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'z', 'ctrlKey': true }));
    //     });
    //     $("#redo-btn").off("click").on("click", function () {
    //         document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'y', 'ctrlKey': true }));
    //     });
    // },[]);

    return isLoaded ? (
        <>
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