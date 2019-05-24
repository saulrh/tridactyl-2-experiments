import {
  Mode,
  CHANGE_MODE,
  ROTATE_MODE,
  ModeActionTypes,
} from "@src/content/store/mode/types"

export function changeMode(newMode: Mode): ModeActionTypes {
  return {
    type: CHANGE_MODE,
    newMode,
  }
}

export function rotateMode(): ModeActionTypes {
  return {
    type: ROTATE_MODE,
  }
}
