import * as flyd from "flyd"

import * as state from "@src/content/state"
import * as actions from "@src/content/actions"

const action_stream: flyd.Stream<actions.ContentAction> = flyd.stream()
const state_stream: flyd.Stream<state.ContentState> = flyd.scan(actions.Apply, state.InitialState(), action_stream)

// Drive responses to changes of state
function View(state: state.ContentState) {
  console.log(state)
}
const output_stream = state_stream.map(View)

// Install listeners and start things running
function Initialize() {
}

Initialize()

action_stream({
  action: "mode/ChangeMode",
})
