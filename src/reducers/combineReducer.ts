import { combineReducers } from "@reduxjs/toolkit";
import { PhraseSymbol, typoReducer } from "./typoReducer";

export type State = {
    typo:PhraseSymbol[]
}

export const combinedReducer = combineReducers({
    typo:typoReducer
})