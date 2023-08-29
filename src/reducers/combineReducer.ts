import { combineReducers } from "@reduxjs/toolkit";
import { PhraseSymbol, typoReducer } from "./typoReducer";
import { Game, gameReducer } from "./gameReducer";

export type State = {
    typo:PhraseSymbol[];
    game:Game;
}

export const combinedReducer = combineReducers({
    typo:typoReducer,
    game:gameReducer
})