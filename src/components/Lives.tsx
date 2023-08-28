import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { Carriage } from "./Typo";

interface Lives{
    lives:number;
    carriage: React.MutableRefObject<Carriage>;
}

export const Lives:React.FC<Lives> = ({lives,carriage}) => {
    return <ul className="typo__lives">
            {new Array(lives).fill(1).map((el,index)=>{
                return  <li className="typo__lives--item" key={el+index}>
                    {carriage.current.typos < index+el
                    ?<FaHeart/>
                    :<FaHeartBroken/>
                    }
                </li>
            })}
        </ul>
}