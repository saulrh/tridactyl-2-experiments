import * as flyd from "flyd"
import produce from "immer"

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
type ContentState = Readonly<{
    keyseq: {
	keys: string[]
    },
    mode: {
	current: ModeType
	previous?: ModeType
    }
}>

const initial: ContentState = {
    keyseq: {
        keys: [],
    },
    mode: {
	current: 'normal',
    }
}

type Action = (model: ContentState) => ContentState

type Updates = flyd.Stream<Action>
type Models = flyd.Stream<ContentState>


/**** Actions ****/

const createActions = (updates: Updates) => ({
    mode: modeActions(updates),
    keyseq: keyseqActions(updates),
})

// Imagine these are bigger and maybe imported from different files.
const modeActions = (updates: Updates) => ({
    change_mode: (newmode: ModeType) => updates(model =>
	produce(model, ({mode}) => { mode.current = newmode }))
})

const keyseqActions = (updates: Updates) => ({
    keydown: (key: string) => updates(model =>
	produce(model, ({keyseq}) => { keyseq.keys.push(key) })),
})

// If we ever need state/actions that require a dynamic key in the state object.
// const moveableActions = (updates: Updates, id: keyof State) => ({
//     someaction: () => updates(model =>
// 	produce(model, ({[id]}) => void (id.foo = 1)))
// })


/**** Meiosis setup ****/

const updates = flyd.stream<Action>()
const models = flyd.scan((state: ContentState, fn: Action) => fn(state), initial, updates)

const actions = createActions(updates)

// Views

models.map(m => console.log(m))
models.map(m => console.log(m.keyseq.keys))

// Listeners

addEventListener("keydown", (ke: KeyboardEvent) => actions.keyseq.keydown(ke.key))
