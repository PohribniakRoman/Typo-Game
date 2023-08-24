export type AccumulatorItem = {
    symbol:string;
    state:"ERROR"|"SUCCESS"|"LOADED";
}

export interface PhraseSymbol{
    index:number;
    success:boolean
}

export type PhraseAction = {
    type: "ADD_SYMBOL",
    payload: PhraseSymbol,
}
 
const defaultState = [] as PhraseSymbol[];


// const updateStorage = (state: Phrase) => {
//     localStorage.setItem("phrase", JSON.stringify(state));
//     return (state);
// }


export const typoReducer = (state = defaultState, action: PhraseAction) => {
    switch (action.type) {
        case "ADD_SYMBOL":{
            const newState = state.filter(symb=>symb.index !== action.payload.index)
            return [...newState,action.payload];
        };
        default:{
            return defaultState;
        }
    }
}