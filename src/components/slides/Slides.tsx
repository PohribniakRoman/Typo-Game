import {useState} from "react";
import { SlidesControls } from "./SlidesControls";

export const Select:React.FC = () => {
    const [slides,setSlides] = useState<number>(0)
    // const dispatch = useDispatch();
    // dispatch({type:"START_GAME",payload}as GameAction)
    return <section className="slides">
        {slides}
        <SlidesControls setSlides={setSlides}/>
    </section>
}