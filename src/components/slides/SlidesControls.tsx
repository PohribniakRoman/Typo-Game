import {IoIosArrowForward,IoIosArrowBack} from "react-icons/io"

interface Controls{
    setSlides:Function;
}

export const SlidesControls:React.FC<Controls> = ({setSlides}) => {
    return <div className="slides__controls">
        <div className="slides__controls--arrows" onClick={()=>setSlides((prev:number)=>prev-1)}><IoIosArrowBack/></div>
        <div className="slides__controls--arrows" onClick={()=>setSlides((prev:number)=>prev+1)}><IoIosArrowForward/></div>
    </div>
}