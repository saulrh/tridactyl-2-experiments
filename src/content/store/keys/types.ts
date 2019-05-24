export const PUSH_KEY = "PUSH_KEY"
export const CLEAR_KEYS = "CLEAR_KEYS"

interface PushKeyAction {
  type: typeof PUSH_KEY
  key: Key
}

interface ClearKeysAction {
  type: typeof CLEAR_KEYS
}

export type KeysActionTypes =
  | PushKeyAction
  | ClearKeysAction

export interface Key {
}

export interface KeysState {
  keys: Array<Key>
}
