import { useState } from "react"
import { Typo } from "./Typo"

export const Sceen:React.FC = () => {
    const [phrase,setPhrase] = useState<string|null>(null);
    return <section className="sceen">
        {phrase
            ?<Typo complexity={1} target={phrase}/>
            :<form onSubmit={(event)=>{
                event.preventDefault();
                const element = event.target as HTMLFormElement;
                setPhrase(element.phrase.value);
            }}>
                <input type="text" name="phrase" required/>
                <button type="submit">Submit</button>
            </form>
        }
    </section>
}