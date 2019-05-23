import * as flyd from "flyd"

import * as mode from "@src/content/mode"
import * as state from "@src/content/state"

interface ChangeModeAction {
  action: "mode/ChangeMode"
  newMode: mode.Mode
}

interface RotateModeAction {
  action: "mode/RotateMode"
}

export type ContentAction =
  | ChangeModeAction


export function Apply(state: state.ContentState, action: ContentAction): state.ContentState {
  return state
}
