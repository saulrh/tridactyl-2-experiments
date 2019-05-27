import * as flyd from "flyd"
import produce from "immer"

import {KeyseqState, keyseqActions, KeyseqInitial} from '@src/keyseq/state'

/*
 * Meiosis demo in typescript with immutable state.
 *
 * Patchinko was considered, but the type definitions aren't as good.
 *
 * Immutable.js was originally used, but the type checking for deep edits isn't
 * as good as for immer.
 *
 * The actions are a bit verbose, but less so than redux and we could write
 * some helpers or adapt something like patchinko to make it less so.
 */

/**** TYPES ****/

type ModeType = 'normal' | 'ignore'

// KeySeq and Mode states could trivially be moved elsewhere if that becomes useful.

// Readonly is not recursive, but that's OK
export type ContentState = Readonly<{
    keyseq: KeyseqState,
    mode: {
        current: ModeType
        previous?: ModeType
    }
}>

const initial: ContentState = {
    keyseq: KeyseqInitial,
    mode: {
        current: 'normal',
    }
}

export type Reducer = (model: ContentState) => ContentState

export type Updates = flyd.Stream<Reducer>
export type Models = flyd.Stream<ContentState>

export type Action = (...args: any[]) => Updates
export type Actions = {
    [key: string]: Action
}

/**** Actions ****/

// Helper functions to make using produce a bit less frustrating.
export type Mutator = (model: ContentState) => void
export const mutator = (updates: Updates, fn: Mutator) =>
    updates(model => produce(model, fn))

const createActions = (updates: Updates): { [key: string]: Actions } => ({
    mode: modeActions(updates),
    keyseq: keyseqActions(updates),
})

// Imagine these are bigger and maybe imported from different files.
const modeActions = (updates: Updates): Actions => ({
    change_mode: (newmode: ModeType) => mutator(updates,
        ({mode}) => { mode.current = newmode })
})

// If we ever need state/actions that require a dynamic key in the state object.
// const moveableActions = (updates: Updates, id: keyof State) => ({
//     someaction: () => updates(model =>
//      produce(model, ({[id]}) => void (id.foo = 1)))
// })


/**** Meiosis setup ****/

const updates: Updates = flyd.stream()
const models: Models = flyd.scan((state: ContentState, fn: Reducer) => fn(state), initial, updates)

const actions = createActions(updates)

// Views

models.map(m => console.log(m))
models.map(m => console.log(m.keyseq.keys))

// Listeners

addEventListener("keydown", (ke: KeyboardEvent) => actions.keyseq.keydown(ke.key))
