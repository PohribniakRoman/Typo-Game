export interface Cube{
    symbol:string;
    success:boolean|null;
}

export const Cube:React.FC<Cube> = ({symbol,success}) => {
    return <div className={`typo__item ${success?"correct":success === null?"":"incorrect"}`}>
        <div className="typo__item--particle top"></div>
        <div className="typo__item--particle right"></div>
        <div className="typo__item--particle front">{symbol}</div>
        <div className="typo__item--particle left"></div>
        <div className="typo__item--particle back"></div>
        <div className="typo__item--particle bottom"></div>
    </div>
}