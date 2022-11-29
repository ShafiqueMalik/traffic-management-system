import React,{useEffect, useState} from 'react'
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./CustomMarkerComponent.scss";
import { setAllMarkers, removeMarker, setSelectedImage,setActiveImageId,setActiveMarkerId } from 'app/slices/mapSliceTest';
import { useSelector, useDispatch } from 'react-redux';

const CustomMarkerComponent = ({markerData}:any) => {
    const [activeMarker, setActiveMarker] = useState(false);
    const {selectedImage,activeMarkerId} = useSelector((state: any) => state.mapTest)
    const dispatch = useDispatch();
    
    const handleMarkerMouseOver = (imageData:any)=>{
        dispatch(setActiveImageId(imageData.id));
    }
    const handleMarkerMouseLeave = (imageData:any)=>{
        dispatch(setActiveImageId(null));
    }
    const handleMarkerClick=(image:any)=>{
        // dispatch(setSelectedImage(image));
        dispatch(setActiveMarkerId(image.id));
    }
    console.log(selectedImage)
   
  return (
    <div className={`custom-marker-component ${activeMarkerId===markerData?.id?"active":""}`}
     onClick={()=>handleMarkerClick(markerData)}  
     onMouseOver={()=>handleMarkerMouseOver(markerData)}
     onMouseLeave={()=>handleMarkerMouseLeave(markerData)}>
        <img src={markerData.image} alt={markerData.image}/>
        <IconButton color='error' className='delete-marker-btn'>
            <CloseIcon/>
        </IconButton>
    </div>
  )
}

export default CustomMarkerComponent