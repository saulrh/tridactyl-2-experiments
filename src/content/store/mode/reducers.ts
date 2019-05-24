import * as immutable from "immutable"
import * as mode_types from "@src/content/store/mode/types"
import * as mode_actions_sync from "@src/content/store/mode/actions_sync"

import {
  CHANGE_MODE,
  ROTATE_MODE,
  MODE_NORMAL,
  MODE_IGNORE,
  ModeActionTypes,
  ModeState,
} from "@src/content/store/mode/types"

const initialState: ModeState = immutable.Record<mode_types.IModeState>({
  mode: MODE_NORMAL
})()

export function modeReducer(
  state: ModeState = initialState,
  action: ModeActionTypes,
): ModeState {
  switch (action.type) {
    case CHANGE_MODE:
      return state.set("mode", action.newMode)
    case ROTATE_MODE:
      const newMode = {
        MODE_NORMAL: MODE_IGNORE,
        MODE_IGNORE: MODE_NORMAL,
      }[state.mode]
      return modeReducer(state, mode_actions_sync.changeMode(newMode))
    default:
      return state
  }
}
