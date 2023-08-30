import { useCallback, useEffect, useRef} from "react"
import { useDispatch, useSelector } from "react-redux";
import { PhraseAction } from "../reducers/typoReducer";
import { State } from "../reducers/combineReducer";
import { Cube } from "./Cube";
import { ProggressCounter } from "./ProggressCounter";
import { Reset } from "./Reset";
import { Lives } from "./Lives";
import { Streak } from "./Streak";
import { Timer } from "./Timer";
import { Quit } from "./Quit";


interface Timer{
    refresh:boolean;
    start:boolean;
}

export interface Carriage{
    index:number;
    typos:number;
    streek:number;
    refreshing?:boolean;
}

const carriageDefultState = {
    index:0,
    typos:0,
    streek:0,
    refreshing:false,
}

export const Typo:React.FC = () => {
    const dispatch = useDispatch();
    const once= useRef<boolean>(true)
    const typo = useSelector((state:State)=>state.typo)
    const game = useSelector((state:State)=>state.game)
    const timer = useRef<Timer>({refresh:true,start:false}) 
    const carriage = useRef<Carriage>(carriageDefultState);

    if(!game.phrase || !game.complexity)return;

    if(typo.filter(el=>el.success).length === game.phrase.length){
        timer.current.start = false;
        timer.current.refresh = false;
    }else if(typo.length){
        timer.current.start = true;
        timer.current.refresh = true;
    }else{
        timer.current.refresh = true;
    }

  
    
    const loadFromStorage = useCallback(() => {
        const storage = localStorage.getItem("carriage");
        if(storage)carriage.current = JSON.parse(storage);
    },[])
    
    once.current && loadFromStorage();
    
    const handlePress = (event:KeyboardEvent) => {
        if(carriage.current.refreshing || !game.phrase)return
        if(game.phrase && event.key === game.phrase[carriage.current.index]){
            dispatch({type:"ADD_SYMBOL",payload:{
                index:carriage.current.index,
                success:true,
            }} as PhraseAction)
            carriage.current.index+=1;
            carriage.current.streek+=1;
        }else{
            dispatch({type:"ADD_SYMBOL",payload:{
                index:carriage.current.index,
                success:false,
            }} as PhraseAction)
            carriage.current.typos+=1;
            carriage.current.streek = 0;
        }
        localStorage.setItem("carriage",JSON.stringify(carriage.current))
    }
    
    const reset = useCallback(() => {
        carriage.current.index = 0;
        carriage.current.streek = 0;
        carriage.current.typos = 0;
        carriage.current.refreshing = false;
        timer.current.refresh = true;
        timer.current.start = false;
        dispatch({type:"RESET"})
    },[])
    
    
    useEffect(()=>{
        reset();
    },[game.phrase])

    useEffect(()=>{
        window.addEventListener("keypress",handlePress);
        return ()=>window.removeEventListener("keypress",handlePress);
    },[])
    
    const maxTypos = game.complexity;
    const correctGuessed = typo.filter(el=>el.success).length;
    const precentage = correctGuessed*100/game.phrase.length || 0;
    const visualizePrecentage = precentage === 100?(correctGuessed-1)*100/game.phrase.length:precentage;


    if(carriage.current.typos === maxTypos){
        carriage.current.refreshing = true;
        timer.current.refresh = false;
        timer.current.start = false;
        setTimeout(reset,1000);
    }

    return <>
        <Reset reset={reset}/>
    <div className="sceen__container">

        <ul className="typo" style={{transform:`translate3d(-${0.601* visualizePrecentage}%, ${Math.sin(31.6) * visualizePrecentage -50}%, ${1.4 * precentage===100?correctGuessed-1:correctGuessed}em)`}}>
            {game.phrase.split("").map((symbol,index)=>{
                if(typo[index]){
                    return <Cube key={index} index={index} success={typo[index].success?"correct":"incorrect current"} symbol={symbol}/>
                }
                if(!typo[index] && typo[index-1] && typo[index-1].success){
                    return <Cube index={index} key={index} success={"current"} symbol={symbol}/>
                }
                if(index === 0){
                    return <Cube key={index} index={index} success={"current"} symbol={symbol}/>
                }
                return <Cube key={index} success={null} index={index} symbol={symbol}/>
            })}
        </ul>
        <Lives lives={maxTypos} carriage={carriage}/>


        <div className="typo__footer">
            <Timer reset={timer.current.refresh} triggered={timer.current.start}/>
            <div className="typo__precentage">
                <ProggressCounter value={Math.round(precentage)}/>
            </div>
            <Streak streak={carriage.current.streek}/>
        </div>
        <Quit carriage={carriage} timer={timer}/>
    </div>
    </>
} 