
import {createStore, combineReducers } from 'redux';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

export function clickTile (identity) {
    return {
        type: "CLICK_TILE",
        identity: identity
    }
}

export function addTile (identity) {
    return {
        type: "ADD_TILE",
        identity: identity
    }
}

const TileBoard = (state = [], action) => {
    switch (action.type) {
        case ("ADD_TILE"):
            let tile = {
                on: Math.floor(Math.random()*2),
                identity: action.identity
            }
            return [...state, tile]
        case ("CLICK_TILE"):
            let x = parseInt(action.identity[0]);
            let y = parseInt(action.identity[1]);
            let possibles = [action.identity, JSON.stringify(x+1) + JSON.stringify(y), 
                            JSON.stringify(x-1) + JSON.stringify(y), JSON.stringify(x) +
                            JSON.stringify(y-1), JSON.stringify(x) + JSON.stringify(y+1)];

            let newObjects = state.map(identities => {
                if (possibles.includes(identities.identity)) {
                    let newObject = JSON.parse(JSON.stringify(identities))
                    newObject.on = Math.abs(identities.on - 1)
                    return newObject
                }
            })
            newObjects = newObjects.filter(object => object !== undefined)
            let newState = state.filter(thing => possibles.includes(thing.identity) == false)
            let unsortedNewState = newState.concat(newObjects)
            const pusheens = ['02','12','22','01','11','21','00','10','20']
            let sortedState = pusheens.map(bruh => {
                return unsortedNewState.filter(please => please.identity == bruh)[0]
            })
            return sortedState
        default:
            return state
    }
}


const reducers = combineReducers({
    TileBoard: TileBoard
})

export const store = createStore(reducers);