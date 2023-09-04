import React from "react";
//@ts-ignore
import confetti from "https://cdn.skypack.dev/canvas-confetti";
import { useDispatch, useSelector } from "react-redux";
import { GameAction } from "../../reducers/gameReducer";
import { State } from "../../reducers/combineReducer";

export const EndScreen:React.FC = () => {
    confetti();
    confetti();
    const game = useSelector((state:State)=>state.game)
    const dispatch = useDispatch();
    return <section className="endscreen">
        <h1 className="endscreen__title">Congratilations!</h1>
        <div className="endscreen__container">
            <h3>Score:
                <span>{game.score*(4-(game.complexity?game.complexity:3))}</span>
            </h3>
            <h3>Time:
                <span>{game.time}</span>
            </h3>
            <h3>Complexity:
                <span>{game.complexity}</span>
            </h3>
        </div>
        <p className="endscreen__phrase">
            Phrase:
            <span>{game.phrase}</span>
        </p>
        <button className="endscreen__btn" onClick={()=>{
            dispatch({type:"RESET_GAME"} as GameAction)
        }}>Back to menu</button>
    </section>
}