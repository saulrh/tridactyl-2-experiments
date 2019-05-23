import * as flyd from "flyd"
import { Map } from "immutable"
import { Record, RecordOf } from "immutable"

import * as mode from "@src/content/mode"
import * as keys from "@src/content/keys"
import * as meiosis from "@src/lib/meiosis"

// The state itself
interface IContentState {
  mode: mode.ModeState
  keys: keys.KeysState
}
const ContentStateFactory = Record<IContentState>({
  mode: mode.InitialState(),
  keys: keys.InitialState(),
})
export type ContentState = RecordOf<IContentState>
export type ContentAction = (oldState: ContentState) => ContentState

const action_stream: flyd.Stream<ContentAction> = flyd.stream()
const state_stream: flyd.Stream<ContentState> = flyd.scan((s, a) => a(s), ContentStateFactory(), action_stream)

// Available actions
const actions = {
  mode: meiosis.MapActions("mode", mode.Actions, action_stream),
  keys: meiosis.MapActions("keys", keys.Actions, action_stream),
}

// Drive responses to changes of state
function View(state: ContentState) {
  console.log(state)
}
const output_stream = state_stream.map(View)

// Install listeners and start things running
function Initialize() {
  mode.Initialize()
  keys.Initialize()
}

Initialize()
