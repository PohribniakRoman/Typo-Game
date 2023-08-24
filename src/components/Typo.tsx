import { useEffect, useRef} from "react"
import { useDispatch, useSelector } from "react-redux";
import { PhraseAction } from "../reducers/typoReducer";
import { State } from "../reducers/combineReducer";
import { Cube } from "./Cube";


export const Typo:React.FC = () => {
    const once= useRef<boolean>(true)
    const phrase = useRef<string>("Lorem ipsum dolor sit amet.")
    const carriage = useRef<number>(0);
    const dispatch = useDispatch();
    const typo = useSelector((state:State)=>state.typo)

    useEffect(()=>{
        if(once.current){
            once.current = false;
            console.log("ONCE");
            window.addEventListener("keypress",(event)=>{
                if(event.key === phrase.current[carriage.current]){
                    dispatch({type:"ADD_SYMBOL",payload:{
                        index:carriage.current,
                        success:true,
                    }} as PhraseAction)
                    carriage.current+=1;
                }else{
                    dispatch({type:"ADD_SYMBOL",payload:{
                        index:carriage.current,
                        success:false,
                    }} as PhraseAction)
                }
            })
        }
    },[])

    console.log(typo);
    
    return <ul className="typo">
        {phrase.current.split("").map((symbol,index)=>{
            if(typo[index]){
                return <Cube key={index} success={typo[index].success} symbol={symbol}/>
            }
            return <Cube key={index} success={null} symbol={symbol}/>
        })}
    </ul>
} 