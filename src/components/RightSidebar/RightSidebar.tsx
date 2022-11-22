import React, { useEffect, useState } from 'react'
import imagesData from "assets/images"
import { useSelector, useDispatch } from 'react-redux';
import $ from "jquery";
import { setCopiedMarkerElement } from 'app/slices/mapSlice';


import { ButtonGroup, Button, IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import "./RightSidebar.scss";
const RightSidebar = () => {
    const activeImageId = useSelector((state: any) => state.map.activeImageId)

    const dispatch = useDispatch();

    useEffect(() => {
        $(document).off("click").on("click", ".right-sidebar-content .sign-img", function () {
            $(".right-sidebar-content .sign-img").removeClass("active");
            $(this).addClass("active");
            // $copiedCustomMarker = undefined;
            //  map.setOptions({ draggableCursor: 'crosshair' });
            dispatch(setCopiedMarkerElement(null));
        });
    }, []);
    const undoRedoHandler = (action: string) => {
        if (action === "undo") {
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'z', 'ctrlKey': true }));

        } else {
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'y', 'ctrlKey': true }));
        }
    }
    return (
        <aside className="right-sidebar">
            <div className="right-sidebar-content">
                {imagesData.map((image) => (
                    <div className="img-container" key={image.id}>
                        <img src={image.image}
                            className={`sign-img ${image.shapeName === "polyline"? "sign-polyline":image.shapeName === "marker"?"sign-marker":""}
                            `}
                            data-image-id={image.id} alt="sign" />
                    </div>
                ))}

                {/* <div className="img-container">
                    <img src={images.image2}  className="sign-img" onClick={handleImageClick} data-image-id="2"  alt="image 2" />
                </div>
                <div className="img-container">
                    <img src={images.image3}  className="sign-img"  onClick={handleImageClick} data-image-id="3"  alt="image 3" />
                </div>
                <div className="img-container">
                    <img src={images.image4}  className="sign-img sign-polyline" onClick={handleImageClick} data-image-id="4"  alt="image 4" />
                </div> */}

                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button aria-label="Undo" onClick={() => undoRedoHandler("undo")} id="undo-btn" color="primary">
                        <UndoIcon />
                    </Button>
                    <Button aria-label="Redo" onClick={() => undoRedoHandler("redo")} id="redo-btn" color="primary">
                        <RedoIcon />
                    </Button>

                </ButtonGroup>
            </div>
        </aside>
    )
}

export default RightSidebar