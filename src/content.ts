import * as flyd from "flyd"
import { Map, List } from "immutable"
import { Record, RecordOf } from "immutable"

/*
 * Meiosis demo in typescript with immutable.js
 *
 * The actions are a bit verbose, but less so than redux and we could write
 * some helpers or adapt something like patchinko to make it less so.
 *
 * Splitting the work into components is harder, but I don't think we really need to do that.
 *
 * Type checking and immutable.js interop are both pretty good. If immutable.js
 * is a pain or something then we could quite easily get compile time
 * guarantees on the state object, I think.
 *
 * Using immutable.merge rather than somerecord.merge() loses compile-time type checking, sadly.
 *
 * Moving on, let's see if we can have separate state and actions for mode and keyseq.
 */

const keyseqInitial = Record({
    keys: List<any>()
})()

const initial = Record({
    keyseq: keyseqInitial
})()

// type ContentState = RecordOf<{keys: List<any>}>
type ContentState = typeof initial

type Reducer = (model: ContentState) => ContentState

type Updates = flyd.Stream<Reducer>
type Models = flyd.Stream<ContentState>

const createActions = (updates: Updates) => ({
    keydown: (key: string) => updates(model =>
        // Either of these work, but neither has very good type checking
        // model.mergeDeep({ keyseq: {keys: List([key])} } as ContentState)),

        // mergeDeep merges entries onto the end of Lists.
        // If we wanted to perform some other op on the deep object we'd need setIn:
        model.setIn(['keyseq', 'keys'], model.keyseq.keys.push(key))),

    // notvalid: () => updates(m => 4)
})

const updates = flyd.stream<Reducer>()
const models = flyd.scan((state: ContentState, fn: Reducer) => fn(state), initial, updates)

const actions = createActions(updates)

// Example action

// const act: Reducer = (model: ContentState) => model.merge({keys: List([1])})
// updates(act)

// Views

models.map(m => console.log(m.toString()))

// Listeners

addEventListener("keydown", (ke: KeyboardEvent) => actions.keydown(ke.key))
