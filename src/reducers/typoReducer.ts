export type AccumulatorItem = {
    symbol:string;
    state:"ERROR"|"SUCCESS"|"LOADED";
}

export interface PhraseSymbol{
    index:number;
    success:boolean
}

export type PhraseAction = {
    type: "ADD_SYMBOL" | "RESET",
    payload: PhraseSymbol,
}
 
const storage = localStorage.getItem("typo");
const defaultState = JSON.parse(storage?storage:`[]`)  as PhraseSymbol[];



const updateStorage = (state: PhraseSymbol[]) => {
    localStorage.setItem("typo", JSON.stringify(state));
    return (state);
}


export const typoReducer = (state = defaultState, action: PhraseAction) => {
    switch (action.type) {
        case "ADD_SYMBOL":{
            const newState = state.filter(symb=>symb.index !== action.payload.index)
            return updateStorage([...newState,action.payload]);
        };
        case "RESET" :{
            localStorage.removeItem("time");
            localStorage.removeItem("typo")
            localStorage.removeItem("carriage")
            return [];
        }
        default:{
            return defaultState;
        }
    }
}