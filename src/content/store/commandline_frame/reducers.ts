import * as immutable from 'immutable'
import * as commandline_types from '@src/content/store/commandline_frame/types'
import * as commandline_actions_sync from '@src/content/store/commandline_frame/actions_sync'

export const initialState: commandline_types.CommandlineFrameState =
  immutable.Record<commandline_types.CommandlineFrameStateInterface>({
    hidden: false
  })();

export function commandlineFrameReducer(
  state: commandline_types.CommandlineFrameState = initialState,
  action: commandline_types.CommandlineFrameActionTypes
): commandline_types.CommandlineFrameState {
  switch (action.type) {
    case commandline_types.HIDE_COMMANDLINE:
      return commandlineFrameReducer(
        state, commandline_actions_sync.setCommandlineVisibility(false))
    case commandline_types.SHOW_COMMANDLINE:
      return commandlineFrameReducer(
        state, commandline_actions_sync.setCommandlineVisibility(true))
    case commandline_types.SET_COMMANDLINE_VISIBILITY:
      return state.set('hidden', action.hidden)
    default:
      return state
  }
}
