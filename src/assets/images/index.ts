import image1 from "./1.jpg";
import image2 from "./2.jpg";
import image3 from "./3.jpg";
import image4 from "./4.jpg";
import image5 from "./1.jpg";
import image6 from "./1.jpg";
// export default {
//     image1,
//     image2,
//     image3,
//     image4,
// }
type imageDataType = {
    id:number,
    image:string,
    isMarker?:boolean,
    shapeName?:string,

}
const imageData:imageDataType[]= [
    {
        id:1,
        image:image1,
        shapeName:"marker"
    },
    {
        id:2,
        image:image2,
        shapeName:"marker"

    },
    {
        id:3,
        image:image3,
        shapeName:"marker"
    },
    {
        id:4,
        image:image4,
        shapeName:"polyline"
    },
];

export default imageData;
