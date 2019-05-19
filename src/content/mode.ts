import * as flyd from "flyd"
import { Record, RecordOf } from "immutable"

export type Mode =
  | "normal"
  | "ignore"

interface IModeState {
  mode: Mode
}
export type ModeState = RecordOf<IModeState>
const ModeStateFactory = Record<IModeState>({mode: "normal"})
export type ModeAction = (oldState: ModeState) => ModeState

function ChangeMode(state: ModeState, newMode: Mode): ModeState {
  return state.merge({mode: newMode})
}

function RotateState(state: ModeState): ModeState {
  switch (state.mode) {
    case "normal": return ChangeMode(state, "ignore")
    case "ignore": return ChangeMode(state, "normal")
  }
}

export function Initial(): ModeState {
  return ModeStateFactory({mode: "ignore"})
}

export function Actions(apply: (f: ModeAction) => void) {
  return {
    changeMode: (newMode: Mode) => {
      apply((state) => ChangeMode(state, newMode))
    },
    rotateMode: (id: string) => {
      apply((state) => RotateState(state))
    },
  }
}
