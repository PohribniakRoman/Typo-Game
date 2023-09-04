import { Typo } from "./Typo"
import { useSelector } from "react-redux"
import { State } from "../reducers/combineReducer";
import { Select } from "./slides/Slides";
import { EndScreen } from "./endscreen/EndScreen";

export const Sceen:React.FC = () => {
    const gameState = useSelector((state:State)=>state.game);
   

    return <section className="sceen">
        {gameState.showEndScreen?
        <EndScreen/>
        :gameState.isStarted
            ?<Typo/>
            :<Select/>
        }
        <div className="stars__container">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
    </section>
}