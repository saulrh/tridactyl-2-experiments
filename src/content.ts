import * as flyd from "flyd"
import produce from "immer"
import * as inject_commandline from "@src/content/inject_commandline"

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
  },
  commandline: {
    hidden: boolean
  }
}>

const initial: ContentState = {
  keyseq: {
    keys: [],
  },
  mode: {
	  current: 'normal',
  },
  commandline: {
    hidden: true
  }
}

type Action = (model: ContentState) => ContentState

type Updates = flyd.Stream<Action>
type Models = flyd.Stream<ContentState>

/**** Actions ****/

const createActions = (updates: Updates) => ({
  mode: modeActions(updates),
  keyseq: keyseqActions(updates),
  commandline: commandlineActions(updates),
})

// Imagine these are bigger and maybe imported from different files.
const modeActions = (updates: Updates) => ({
  change_mode: (newmode: ModeType) => updates(
    model => produce(model, ({mode}) => { mode.current = newmode }))
})

const keyseqActions = (updates: Updates) => ({
  keydown: (key: string) => updates(
    model => {
      const newState = produce(model, ({keyseq}) => { keyseq.keys.push(key) })
      const keysString = newState.keyseq.keys.join()

      if (keysString.endsWith("c")) {
        return produce(newState, ({commandline, keyseq}) => {
          commandline.hidden = false
          keyseq.keys = []
        })
      } else if (keysString.endsWith("v")) {
        return produce(newState, ({commandline, keyseq}) => {
          commandline.hidden = true
          keyseq.keys = []
        })
      }

      return newState
    }),
    // updateCurrentTab: async _ => {
        // await current = bg.getCurrentTab()
        // updates(model => {
            // if model is fresh enough:
                // produce(model, model => { model.currenttab = current) })
        // })
})

const commandlineActions = (updates: Updates) => ({
  set_hidden: (hidden: boolean) => updates(
    model => produce(model, ({commandline}) => { commandline.hidden = hidden })),
})

// If we ever need state/actions that require a dynamic key in the state object.
// const moveableActions = (updates: Updates, id: keyof State) => ({
//     someaction: () => updates(model =>
//      produce(model, ({[id]}) => void (id.foo = 1)))
// })


/**** Other setup ****/

const commandline = inject_commandline.injectCommandline()

/**** Meiosis setup ****/

const updates = flyd.stream<Action>()
const models = flyd.scan((state: ContentState, fn: Action) => {
  try {
    return fn(state)
  } catch (e) {
    console.error("Error during action handling", e)
    return state
  }
}, initial, updates)

const actions = createActions(updates)

// Views

models.map(m => console.log(m))
models.map(m => console.log(m.keyseq.keys))
models.map(m => inject_commandline.render(commandline, m.commandline))

// Listeners

addEventListener("keydown", (ke: KeyboardEvent) => actions.keyseq.keydown(ke.key))
