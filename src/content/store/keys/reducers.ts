import {
  PUSH_KEY,
  CLEAR_KEYS,
  KeysActionTypes,
  KeysState,
} from "@src/content/store/keys/types"

const initialState: KeysState = {
  keys: [],
}

export function keysReducer(
  state: KeysState = initialState,
  action: KeysActionTypes,
): KeysState {
  switch (action.type) {
    case PUSH_KEY:
      return {
        keys: [...state.keys, action.key]
      }
    case CLEAR_KEYS:
      return {
        keys: []
      }
    default:
      return state
  }
}
