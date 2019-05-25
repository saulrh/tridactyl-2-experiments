import * as immutable from 'immutable';
import * as mode_types from '@src/content/store/mode/types';
import * as mode_actions_sync from '@src/content/store/mode/actions_sync';

const initialState: mode_types.ModeState = immutable.Record<mode_types.ModeStateInterface>(
  {
    mode: mode_types.MODE_NORMAL,
  }
)();

function rotateMode(mode: mode_types.Mode): mode_types.Mode {
  switch (mode) {
    case mode_types.MODE_IGNORE:
      return mode_types.MODE_NORMAL;
    case mode_types.MODE_NORMAL:
      return mode_types.MODE_IGNORE;
    default:
      throw new Error('Unknown mode');
  }
}

export function modeReducer(
  state: mode_types.ModeState = initialState,
  action: mode_types.ModeActionTypes
): mode_types.ModeState {
  switch (action.type) {
    case mode_types.CHANGE_MODE:
      return state.set('mode', action.newMode);
    case mode_types.ROTATE_MODE:
      return modeReducer(
        state,
        mode_actions_sync.changeMode(rotateMode(state.mode))
      );
    default:
      return state
  }
}
