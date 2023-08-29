export interface GameAction{
    type:"SET_TIME"|"SET_SCORE"|"START_GAME"|"END_GAME"|"SET_PROGRESS"|"RESET_GAME";
    payload:any;
}

export interface Game{
    isStarted:boolean;
    phrase:null|string;
    complexity:null|1|2|3;
    time:null|string;
    score:null|number;
    progress:null|number;
    showEndScreen:boolean;
}

const defaultState = {
    phrase:null,
    complexity:null,
    time:null,
    score:null,
    progress:null,
    isStarted:false,
    showEndScreen:false,
} as Game;

const updateStorage = (state: Game) => {
    localStorage.setItem("game", JSON.stringify(state));
    return (state);
}


export const gameReducer = (state=defaultState,action:GameAction) => {
    switch (action.type){
        case "SET_SCORE":{
            const newState = JSON.parse(JSON.stringify(state)) as Game;
            newState.score = action.payload.score;
            return updateStorage(newState);
        }
        case "SET_TIME":{
            const newState = JSON.parse(JSON.stringify(state)) as Game;
            newState.time = action.payload.time;
            return updateStorage(newState);
        }
        case "SET_PROGRESS":{
            const newState = JSON.parse(JSON.stringify(state)) as Game;
            newState.progress = action.payload.progress;
            return updateStorage(newState);
        }
        case "START_GAME":{
            const newState = JSON.parse(JSON.stringify(state)) as Game;
            newState.phrase = action.payload.phrase;
            newState.complexity = action.payload.complexity;
            newState.isStarted = true;
            return updateStorage(newState);
        };
        case "END_GAME":{
            const newState = JSON.parse(JSON.stringify(state)) as Game;
            newState.showEndScreen = true;
            return updateStorage(newState);
        };
        case "RESET_GAME":{
            localStorage.removeItem("carriage");
            localStorage.removeItem("typo");
            localStorage.removeItem("time");
            const newState = JSON.parse(JSON.stringify(defaultState)) as Game;
            return updateStorage(newState);
        };
        default:{
            const prevState = localStorage.getItem("game"); 
            if(prevState){
                return JSON.parse(prevState);
            }
            return updateStorage(defaultState);
        }
    }
}