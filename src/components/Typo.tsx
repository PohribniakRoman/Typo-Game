import { useEffect, useRef} from "react"
import { useDispatch, useSelector } from "react-redux";
import {FaHeart,FaHeartBroken} from "react-icons/fa"
import { PhraseAction } from "../reducers/typoReducer";
import { State } from "../reducers/combineReducer";
import { Cube } from "./Cube";

export interface Typo{
    target:string;
    complexity:1|2|3;
}

interface Carriage{
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

export const Typo:React.FC<Typo> = ({target,complexity}) => {
    const once= useRef<boolean>(true)
    const phrase = useRef<string>(target)
    const carriage = useRef<Carriage>(carriageDefultState);
    const dispatch = useDispatch();
    const typo = useSelector((state:State)=>state.typo)
    
    const handlePress = (event:KeyboardEvent) => {
        if(carriage.current.refreshing)return
        if(event.key === phrase.current[carriage.current.index]){
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
    
    const reset = () => {
        carriage.current = {...carriageDefultState};
        carriage.current.refreshing = false;
        localStorage.setItem("carriage",JSON.stringify(carriage.current))
        dispatch({type:"RESET"})
    }

    const loadFromStorage = () => {
        const storage = localStorage.getItem("carriage");
        if(storage)carriage.current = JSON.parse(storage);
    }

    useEffect(()=>{
        if(once.current){
            once.current = false;
            window.addEventListener("keypress",handlePress)
        }
    },[])
    
    const maxTypos = complexity;
    const correctGuessed = typo.filter(el=>el.success).length;
    const precentage = correctGuessed*100/phrase.current.length || 0;
    
    
    
    once.current && loadFromStorage();
    if(carriage.current.typos === maxTypos){
        carriage.current.refreshing = true;
        setTimeout(reset,1000)
    }

    return <div className="sceen__container">
        <ul className="typo" style={{transform:`translate3d(-${0.5688*precentage}%, ${Math.sin(31.92)*precentage -50}%, ${1.4 * correctGuessed}em)`}}>
            {phrase.current.split("").map((symbol,index)=>{
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
        <div className="typo__precentage">{`${Math.round(precentage)}%`}</div>
        <button className="typo__reset" onClick={reset}>Reset</button>
        <ul className="typo__lives">
            {new Array(maxTypos).fill(1).map((el,index)=>{
                return  <li className="typo__lives--item" key={el+index}>
                    {carriage.current.typos < index+el
                    ?<FaHeart/>
                    :<FaHeartBroken/>
                    }
                </li>
            })}
        </ul>
        Streek:{carriage.current.streek}
    </div>
} 