import { useDispatch } from "react-redux";
import { SlideItem } from "./Slides"
import { GameAction } from "../../reducers/gameReducer";

type Slide = SlideItem & {
    index:number;
    current:number;
    max:number;
}

export const SlidesItem:React.FC<Slide> = ({complexity,phrase,title,index,current,max}) => {
    const dispatch = useDispatch();
    let position = null;

    if(current === 0 && index === max-2)position = -3;
    if(current === 1 && index === max-1)position = -3;
    if(current === 2 && index === max)position = -3;
    
    if(current === 0 && index === max)position = -1;
    if(current === max && index === 0)position = 1;
    
    if(current === 1 && index === max)position = -2;
    if(current === 0 && index === max-1)position = -2;
    
    if(current === max && index === 1)position = 2;
    if(current === max-1 && index === 0)position = 2;
    
    if(current === max-1 && index === 1)position = 3;
    if(current === max-2 && index === 0)position = 3;
    if(current === max && index === 2)position = 3;


    
    
    return <li className="slides__item" data-position={position?position:index-current}>
        <h3 className="slides__item--title">{title}</h3>
        <p className="slides__item--complexity">{complexity}</p>
        <button onClick={()=>{
            dispatch({type:"START_GAME",payload:{phrase,complexity}}as GameAction)
        }} disabled={current-index !== 0?true:false}>Start</button>
    </li>
}