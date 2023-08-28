import { RiRefreshLine } from "react-icons/ri";

interface Reset{
    reset:Function;
}

export const Reset:React.FC<Reset> = ({reset}) =>{
    return <div className="typo__reset" onClick={(event)=>{
        const element = event.target as HTMLDivElement;
        element.classList.add("spin")
        setTimeout(()=>{
            element.classList.remove("spin")
        },500)
        reset();
    }}><RiRefreshLine/></div>
}