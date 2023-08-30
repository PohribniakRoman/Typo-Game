import {AiOutlineCloseCircle} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { GameAction } from "../reducers/gameReducer";

interface Quit{
    carriage:any;
    timer:any;
}

export const Quit:React.FC<Quit> = ({carriage,timer}) =>{
    const dispatch = useDispatch();
    return <div className="typo__quit" onClick={()=>{
        carriage.current.index = 0;
        carriage.current.streek = 0;
        carriage.current.typos = 0;
        carriage.current.refreshing = false;
        timer.current.refresh = true;
        timer.current.start = false;
        dispatch({type:"RESET_GAME"}as GameAction);
    }}><AiOutlineCloseCircle/></div>
}