import {
  CHANGE_MODE,
  ROTATE_MODE,
  MODE_NORMAL,
  MODE_IGNORE,
  ModeActionTypes,
  ModeState,
} from "@src/content/store/mode/types"

const initialState: ModeState = {
  mode: MODE_NORMAL
}

export function modeReducer(
  state: ModeState = initialState,
  action: ModeActionTypes,
): ModeState {
  switch (action.type) {
    case CHANGE_MODE:
      return {
        mode: action.newMode
      }
    case ROTATE_MODE:
      return {
        mode: {
          MODE_NORMAL: MODE_IGNORE,
          MODE_IGNORE: MODE_NORMAL,
        }[state.mode]
      }
    default:
      return state
  }
}
