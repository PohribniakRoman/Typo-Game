import { useRef } from "react";

export interface Cube{
    symbol:string;
    index:number;
    success:"correct"|"incorrect current"|"current"|null;
}

export const Cube:React.FC<Cube> = ({symbol,success,index}) => {
    const cubeRef = useRef<HTMLDivElement|null>(null);
    
    if(success?.includes("incorrect")){
        cubeRef.current?.classList.add("incorrect")
        setTimeout(() => {
            cubeRef.current?.classList.remove("incorrect")
        }, 500);
    }
    return <div ref={cubeRef} className={`typo__item ${success?success:""}`} style={{transform:`rotateY(40deg) translate3d(-50%,0,-${index*2}em)`}}>
        <div className="typo__item--particle top"></div>
        <div className="typo__item--particle right"></div>
        <div className="typo__item--particle front">{symbol}</div>
        <div className="typo__item--particle left"></div>
        <div className="typo__item--particle back"></div>
        <div className="typo__item--particle bottom"></div>
    </div>
}