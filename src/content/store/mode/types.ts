import * as immutable from "immutable"

export const CHANGE_MODE = "@mode/CHANGE_MODE"
interface ChangeModeAction {
  type: typeof CHANGE_MODE
  newMode: Mode
}

export const ROTATE_MODE = "@mode/ROTATE_MODE"
interface RotateModeAction {
  type: typeof ROTATE_MODE
}

export type ModeActionTypes =
  | ChangeModeAction
  | RotateModeAction

export const MODE_NORMAL = "normal"
export const MODE_IGNORE = "ignore"

export type Mode =
  | typeof MODE_NORMAL
  | typeof MODE_IGNORE

export interface IModeState {
  readonly mode: Mode
}
export type ModeState = immutable.RecordOf<IModeState>
