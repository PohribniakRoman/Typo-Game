import { useState,useRef,useEffect } from "react";

interface Timer{
    triggered:boolean;
    reset:boolean;
}

const generate0String = (value:number,target:number):string => {
    const acc = new Array(target).fill(target-`${value}`.length).map((el,index)=>index<el?"0":"");
    return `${acc.join("")}${value}`
}

const prevState = localStorage.getItem("time");
export const Timer:React.FC<Timer> = ({triggered,reset}) => {
    const [time,setTime] = useState<number>(prevState?JSON.parse(prevState):0)
    const intervalRef = useRef<null|number>(null)

    useEffect(()=>{
        if(!triggered && intervalRef.current){
           clearInterval(intervalRef.current);
           reset && setTime(0);
        }
        if(triggered){
            intervalRef.current =  setInterval(()=>{
                setTime(prev=>prev+1)
                localStorage.setItem("timer",JSON.stringify(time));
            },1)
        }
    },[triggered,reset])
    return <div className="typo__timer">
        <span className="typo__timer--item">{generate0String(Math.floor(time / 60000),2)}</span>
        :
        <span className="typo__timer--item">{generate0String(Math.floor(time / 1000),2)}</span>
        :
        <span className="typo__timer--item">{generate0String(time % 1000,3)}</span>
    </div>
}