import * as immutable from "immutable"
import * as keys_types from "@src/content/store/keys/types"
import * as keys_actions_sync from "@src/content/store/keys/actions_sync"

import {
  PUSH_KEY,
  CLEAR_KEYS,
  KeysActionTypes,
  KeysState,
} from "@src/content/store/keys/types"

const initialState: KeysState = immutable.Record<keys_types.IKeysState>({
  keys: immutable.List<keys_types.Key>(),
})()

export function keysReducer(
  state: KeysState = initialState,
  action: KeysActionTypes,
): KeysState {
  switch (action.type) {
    case PUSH_KEY:
      if (action.key.key == "c") {
        return keysReducer(state, keys_actions_sync.clearKeys())
      } else {
        return state.set("keys", state.keys.concat(action.key))
      }
    case CLEAR_KEYS:
      return state.set("keys", immutable.List<keys_types.Key>())
    default:
      return state
  }
}
