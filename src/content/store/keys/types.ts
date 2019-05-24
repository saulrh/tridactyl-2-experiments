import * as immutable from "immutable"

export const PUSH_KEY = "PUSH_KEY"
interface PushKeyAction {
  type: typeof PUSH_KEY
  key: Key
}

export const CLEAR_KEYS = "CLEAR_KEYS"
interface ClearKeysAction {
  type: typeof CLEAR_KEYS
}

export type KeysActionTypes =
  | PushKeyAction
  | ClearKeysAction

export interface Key {
  key: string,
}

export interface IKeysState {
  keys: immutable.List<Key>
}
export type KeysState = immutable.RecordOf<IKeysState>
