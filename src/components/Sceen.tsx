import { useCallback} from "react"
import { Typo } from "./Typo"
import { useDispatch, useSelector } from "react-redux"
import { GameAction } from "../reducers/gameReducer";
import { State } from "../reducers/combineReducer";

export const Sceen:React.FC = () => {
    const gameState = useSelector((state:State)=>state.game);
    const dispatch = useDispatch();
    
    
    const hadleSubmit = useCallback((event:React.FormEvent)=>{
        event.preventDefault();
        const element = event.target as HTMLFormElement;
        const payload = {
            phrase:element.phrase.value,
            complexity:parseInt(element.complexity.value)
        }
            dispatch({type:"START_GAME",payload}as GameAction)
    },[])

    return <section className="sceen">
        {gameState.isStarted
            ?<Typo/>
            :<form onSubmit={hadleSubmit}>
                <input type="text" name="phrase" required/>
                <input type="number" name="complexity" defaultValue={3} min={1} max={3}/>
                <button type="submit">Submit</button>
            </form>
        }
        <div className="stars__container">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
    </section>
}