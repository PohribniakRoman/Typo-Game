import {IoIosArrowForward,IoIosArrowBack} from "react-icons/io"

interface Controls{
    maxSlides:number;
    setSlides:Function;
}

export const SlidesControls:React.FC<Controls> = ({setSlides,maxSlides}) => {
    return <div className="slides__controls">
        <div className="slides__controls--arrows" onClick={()=>setSlides((prev:number)=>prev-1>=0?prev-1:maxSlides-1)}><IoIosArrowBack/></div>
        <div className="slides__controls--arrows" onClick={()=>setSlides((prev:number)=>prev+1<maxSlides?prev+1:0)}><IoIosArrowForward/></div>
    </div>
}