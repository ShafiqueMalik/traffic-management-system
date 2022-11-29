import React, { useEffect, useState } from 'react'
import imagesData from "assets/images"
import { useSelector, useDispatch } from 'react-redux';


import { ButtonGroup, Button, IconButton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { setAllMarkers, removeMarker, setSelectedImage,setActiveImageId } from 'app/slices/mapSliceTest';
import "./RightSidebarTest.scss";
const RightSidebar = () => {
    const {selectedImage,activeImageId} = useSelector((state: any) => state.mapTest)

    const dispatch = useDispatch();

    useEffect(() => {
     
    }, []);
    const undoRedoHandler = (action: string) => {
        if (action === "undo") {
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'z', 'ctrlKey': true }));

        } else {
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'y', 'ctrlKey': true }));
        }
    }
    const handleImageClick = (image:any) => {
        dispatch(setSelectedImage(image));
        dispatch(setActiveImageId(image.id));
    }
    return (
        <aside className="right-sidebar">
            <div className="right-sidebar-content">
                {imagesData.map((image) => (
                    <div className="img-container" key={image.id}>
                        <img src={image.image}
                        onClick={() => handleImageClick(image)}
                            className={`sign-img ${image?.id===activeImageId?"active":""} ${image.shapeName === "polyline"? "sign-polyline":image.shapeName === "marker"?"sign-marker":""}
                            `}
                            data-image-id={image.id} alt="sign" />
                    </div>
                ))}

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