import * as flyd from "flyd"

import * as state from "@src/content/state"
import * as mode from "@src/content/mode"
import * as keys from "@src/content/keys"

export type ContentAction = (s: state.ContentState, actions) => state.ContentState

const action_stream: flyd.Stream<ContentAction> = flyd.stream()

export const actions = {
  mode: mode.Actions(action_stream),
}

const state_stream: flyd.Stream<state.ContentState> = flyd.scan((s, a) => a(s, actions), state.InitialState(), action_stream)

// Drive responses to changes of state
function View(state: state.ContentState) {
  console.log(state)
}
const output_stream = state_stream.map(View)

// Install listeners and start things running
function Initialize() {
  keys.Initialize(actions)
  console.log("loaded")
}

Initialize()
