import * as immutable from 'immutable';
import * as keys_types from '@src/content/store/keys/types';
import * as keys_actions_sync from '@src/content/store/keys/actions_sync';

const initialState: keys_types.KeysState = immutable.Record<keys_types.KeysStateInterface>(
  {
    keys: immutable.List<keys_types.Key>(),
  }
)();

export function keysReducer(
  state: keys_types.KeysState = initialState,
  action: keys_types.KeysActionTypes
): keys_types.KeysState {
  switch (action.type) {
    case keys_types.PUSH_KEY:
      if (action.key.key === 'c') {
        return keysReducer(state, keys_actions_sync.clearKeys());
      } else {
        return state.set('keys', state.keys.concat(action.key));
      }
    case keys_types.CLEAR_KEYS:
      return state.set('keys', immutable.List<keys_types.Key>());
    default:
      return state
  }
}
