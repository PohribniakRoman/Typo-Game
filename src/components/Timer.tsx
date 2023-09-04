import { useState,useRef,useEffect } from "react";

interface Timer{
    triggered:boolean;
    reset:boolean;
    timer:any;
}

const generate0String = (value:number,target:number):string => {
    const acc = new Array(target).fill(target-`${value}`.length).map((el,index)=>index<el?"0":"");
    return `${acc.join("")}${value}`
}

export const Timer:React.FC<Timer> = ({triggered,reset,timer}) => {
    const [time,setTime] = useState<number>(0)
    const once = useRef<boolean>(true);
    const intervalRef = useRef<null|number>(null);

    useEffect(()=>{
        const prevState = localStorage.getItem("timer");
        prevState && setTime(parseInt(prevState))
    },[])

    useEffect(()=>{
        if(triggered && once.current){
            once.current = false;
            intervalRef.current = setInterval(()=>{
                setTime(prev=>{
                    localStorage.setItem("timer",JSON.stringify(prev));
                    return prev+1
                })
            },1)
        }else if(!triggered){
            clearInterval(intervalRef.current?intervalRef.current:0);
            once.current = true;
        } 
        reset && setTime(0);
    },[triggered,reset])

    return <div className="typo__timer" ref={timer}>
        <span className="typo__timer--item">{generate0String(Math.floor(time / 60000),2)}</span>
        :
        <span className="typo__timer--item">{generate0String(Math.floor(time / 1000),2)}</span>
        :
        <span className="typo__timer--item">{generate0String(time % 1000,3)}</span>
    </div>
}