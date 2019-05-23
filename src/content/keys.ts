import { Record, RecordOf } from "immutable"
import * as dom from "@src/lib/dom"

interface IKeysState {
  keys: string
}
export type KeysState = RecordOf<IKeysState>
const KeysStateFactory = Record<IKeysState>({keys: "normal"})
type KeysAction = (oldState: KeysState) => KeysState

function AcceptKey(state: KeysState, newKey: string): KeysState {
  return state.merge({keys: state.keys + newKey})
}

export function InitialState(): KeysState {
  return KeysStateFactory({keys: ""})
}

export function Actions(apply: (f: KeysAction) => void) {
  return {
    acceptKey: (key: string) => {
      apply((state) => AcceptKey(state, key))
    }
  }
}

export function Initialize() {
}
