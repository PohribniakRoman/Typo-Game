import {AiOutlineCloseCircle} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { GameAction } from "../reducers/gameReducer";

export const Quit:React.FC = () =>{
    const dispatch = useDispatch();

    return <div className="typo__quit" onClick={()=>{
        dispatch({type:"RESET_GAME"}as GameAction);
    }}><AiOutlineCloseCircle/></div>
}