import * as immutable from 'immutable';
import * as mode_types from '@src/content/store/mode/types';
import * as mode_actions_sync from '@src/content/store/mode/actions_sync';
import {
  CHANGE_MODE,
  ROTATE_MODE,
  MODE_NORMAL,
  MODE_IGNORE,
  ModeActionTypes,
  ModeState,
  Mode,
} from '@src/content/store/mode/types';

const initialState: ModeState = immutable.Record<mode_types.ModeStateInterface>(
  {
    mode: MODE_NORMAL,
  }
)();

function rotateMode(mode: Mode): Mode {
  switch (mode) {
    case MODE_IGNORE:
      return MODE_NORMAL;
    case MODE_NORMAL:
      return MODE_IGNORE;
    default:
      throw new Error('Unknown mode');
  }
}

export function modeReducer(
  state: ModeState = initialState,
  action: ModeActionTypes
): ModeState {
  switch (action.type) {
    case CHANGE_MODE:
      return state.set('mode', action.newMode);
    case ROTATE_MODE:
      return modeReducer(
        state,
        mode_actions_sync.changeMode(rotateMode(state.mode))
      );
    default:
      return state;
  }
}
