import { useEffect, useRef} from "react"
import { useDispatch, useSelector } from "react-redux";
import { PhraseAction } from "../reducers/typoReducer";
import { State } from "../reducers/combineReducer";
import { Cube } from "./Cube";


export const Typo:React.FC = () => {
    const once= useRef<boolean>(true)
    const phrase = useRef<string>("Lorem, ipsum.Lorem, ipsum.Lorem,  ipsum.Lorem, ipsum.Lorem, ipsum.Lorem, ipsum.")
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
    
    const precentage = typo.filter(el=>el.success).length*100/phrase.current.length;

    return <div className="sceen__container">
        <ul className="typo" style={{transform:`translate3d(-${0.572*precentage}%, ${Math.sin(31.5)*precentage -50}%, ${1.2 * precentage}em)`}}>
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
        <div className="typo__precentage">{`${Math.round(precentage )}%`}</div>
    </div>
} 