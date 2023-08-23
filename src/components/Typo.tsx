import { useState } from "react";

const initialPhrase  = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt minima nisi assumenda?`;

export const Typo:React.FC = () => {
    const [phrase,setPhrase] = useState<string>(initialPhrase);
    window.addEventListener("keypress",(event)=>{
        console.log(event);
    })
    return <section onClick={()=>setPhrase("lorem")}>
        {phrase}
    </section>
} 