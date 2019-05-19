import * as flyd from "flyd"
import { Map } from "immutable"

import * as state from "@src/content/state"

import * as modeindicator from "@src/content/modeindicator"

function Init() {
  modeindicator.Init()
}


function View(contentstate: state.ContentState) {
  console.log(contentstate)
  state.View(contentstate, state.Actions)
}

const action_stream: flyd.Stream<state.ContentAction> = flyd.stream()
const state_stream: flyd.Stream<state.ContentState> = flyd.scan((s, a) => a(s), state.Initial(), action_stream)
const output_stream = state_stream.map(View)

// function ChangeMode(newMode: Mode): Action {
//   return (state: ContentState) => {
//     state.mode = newMode
//     return state
//   }
// }

// action_stream(ChangeMode("ignore"))
// action_stream(ChangeMode("normal"))
// action_stream(ChangeMode("normal"))
// action_stream(ChangeMode("ignore"))



Init()
