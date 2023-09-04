import { FaHeart } from "react-icons/fa";

type Hearts = {
    count:1|2|3;
}

export const Hearts:React.FC<Hearts> = ({count}) => {
    return <>
        {new Array(count).fill(1).map((el,index)=>{
                return <FaHeart key={index+el}/>
        })}
    </>
}