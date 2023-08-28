import { useCallback, useEffect, useState } from "react"
import { Typo } from "./Typo"

export const Sceen:React.FC = () => {
    const [phrase,setPhrase] = useState<string|null>(null);

    useEffect(()=>{
        const rawPhrase = localStorage.getItem("phrase")
        if(rawPhrase){
            setPhrase(rawPhrase);
        }
    },[])


    const hadleSubmit = useCallback((event:React.FormEvent)=>{
                event.preventDefault();
                const element = event.target as HTMLFormElement;
                localStorage.setItem("phrase",element.phrase.value)
                setPhrase(element.phrase.value);
    },[])

    return <section className="sceen">
        {phrase
            ?<Typo complexity={3} target={phrase}/>
            :<form onSubmit={hadleSubmit}>
                <input type="text" name="phrase" required/>
                <button type="submit">Submit</button>
            </form>
        }
        <div className="stars__container">
            <div id='stars'></div>
            <div id='stars2'></div>
            <div id='stars3'></div>
        </div>
    </section>
}