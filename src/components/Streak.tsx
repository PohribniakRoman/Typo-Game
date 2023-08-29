interface Streak{
    streak:number;
}

export const Streak:React.FC<Streak> = ({streak}) =>{
    return <div className="typo__streak">{streak}</div>
}