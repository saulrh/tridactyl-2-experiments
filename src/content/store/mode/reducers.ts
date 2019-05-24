import * as immutable from "immutable"
import * as mode_types from "@src/content/store/mode/types"
import * as mode_actions from "@src/content/store/mode/actions"

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
      return state.merge({
        mode: action.newMode
      })
    case ROTATE_MODE:
      return modeReducer(state, mode_actions.changeMode({
        MODE_NORMAL: MODE_IGNORE,
        MODE_IGNORE: MODE_NORMAL,
      }[state.mode]))
    default:
      return state
  }
}
