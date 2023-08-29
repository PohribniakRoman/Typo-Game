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
    const gameState = useSelector((state:State)=>state)
    const phrase = useRef(`${gameState.game.phrase}`)
    const timer = useRef<Timer>({refresh:true,start:false}) 
    const carriage = useRef<Carriage>(JSON.parse(JSON.stringify(carriageDefultState)));
    
    
    if(gameState.typo.length === phrase.current?.length){
        timer.current.start = false;
        timer.current.refresh = false;
    }else if(gameState.typo.length){
        timer.current.start = true;
        timer.current.refresh = true;
    }else{
        timer.current.refresh = true;
    }

    if(!phrase.current || !gameState.game.complexity)return;
  
    const loadFromStorage = useCallback(() => {
        const storage = localStorage.getItem("carriage");
        if(storage)carriage.current = JSON.parse(storage);
    },[])
    once.current && loadFromStorage();

    const handlePress = (event:KeyboardEvent) => {
        if(carriage.current.refreshing)return
        if(phrase.current && event.key === phrase.current[carriage.current.index]){
            dispatch({type:"ADD_SYMBOL",payload:{
                index:carriage.current.index,
                success:true,
            }} as PhraseAction)
            carriage.current.index++;
            carriage.current.streek++;
        }else{
            dispatch({type:"ADD_SYMBOL",payload:{
                index:carriage.current.index,
                success:false,
            }} as PhraseAction)
            carriage.current.typos++;
            carriage.current.streek = 0;
        }
        localStorage.setItem("carriage",JSON.stringify(carriage.current))
    }
    
    console.log(carriage.current);  
    const reset = useCallback(() => {
        carriage.current = JSON.parse(JSON.stringify(carriageDefultState));
        carriage.current.refreshing = false;
        timer.current.refresh = true;
        timer.current.start = false;
        dispatch({type:"RESET"})
    },[])
    

    useEffect(()=>{
        if(once.current){
            once.current = false;
            window.addEventListener("keypress",handlePress);
        }
    },[])
    
    const maxTypos = gameState.game.complexity;
    const correctGuessed = gameState.typo.filter(el=>el.success).length;
    const precentage = correctGuessed*100/phrase.current.length || 0;
    const visualizePrecentage = precentage === 100?(correctGuessed-1)*100/phrase.current.length:precentage;
    
        
    if(carriage.current.typos > maxTypos){
        reset();
    }

    if(carriage.current.typos === maxTypos ){
        carriage.current.refreshing = true;
        setTimeout(reset,1000);
    }

    return <div className="sceen__container">
        <Reset reset={reset}/>

        <ul className="typo" style={{transform:`translate3d(-${0.601* visualizePrecentage}%, ${Math.sin(31.6) * visualizePrecentage -50}%, ${1.4 * precentage===100?correctGuessed-1:correctGuessed}em)`}}>
            {phrase.current.split("").map((symbol,index)=>{
                if(gameState.typo[index]){
                    return <Cube key={index} index={index} success={gameState.typo[index].success?"correct":"incorrect current"} symbol={symbol}/>
                }
                if(!gameState.typo[index] && gameState.typo[index-1] && gameState.typo[index-1].success){
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
        <Quit/>
    </div>
} 