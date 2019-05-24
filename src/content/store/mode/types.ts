export const CHANGE_MODE = "CHANGE_MODE"
export const ROTATE_MODE = "ROTATE_MODE"

interface ChangeModeAction {
  type: typeof CHANGE_MODE
  newMode: Mode
}

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

export interface ModeState {
  mode: Mode
}
