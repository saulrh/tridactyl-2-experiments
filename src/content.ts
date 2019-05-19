import * as flyd from "flyd"
import { Map } from "immutable"
import { Record, RecordOf } from "immutable"

import * as mode from "@src/content/mode"
import * as modeindicator from "@src/content/modeindicator"
import * as meiosis from "@src/lib/meiosis"

interface IContentState {
  mode: mode.ModeState
  modeindicator: modeindicator.ModeIndicatorState
}
const ContentStateFactory = Record<IContentState>({
  mode: mode.InitialState(),
  modeindicator: modeindicator.InitialState(),
})
export type ContentState = RecordOf<IContentState>
export type ContentAction = (oldState: ContentState) => ContentState

function Initialize() {
  modeindicator.Initialize()
  mode.Initialize()
}

function View(state: ContentState) {
  console.log(state)
  mode.View(state, actions)
  modeindicator.View(state, actions)
}

const action_stream: flyd.Stream<ContentAction> = flyd.stream()
const state_stream: flyd.Stream<ContentState> = flyd.scan((s, a) => a(s), ContentStateFactory(), action_stream)
const output_stream = state_stream.map(View)

const actions = {
  mode: meiosis.MapActions("mode", mode.Actions, action_stream),
  modeindicator: meiosis.MapActions("modeindicator", modeindicator.Actions, action_stream)
}

Initialize()
