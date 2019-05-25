import * as immutable from 'immutable';

export const HIDE_COMMANDLINE = '@commandline_frame/HIDE_COMMANDLINE';
interface HideCommandlineAction {
  type: typeof HIDE_COMMANDLINE;
}

export const SHOW_COMMANDLINE = '@commandline_frame/SHOW_COMMANDLINE';
interface ShowCommandlineAction {
  type: typeof SHOW_COMMANDLINE;
}

export const SET_COMMANDLINE_VISIBILITY = '@commandline_frame/SET_COMMANDLINE_VISIBILITY';
interface SetCommandlineVisibilityAction {
  type: typeof SET_COMMANDLINE_VISIBILITY;
  hidden: boolean;
}

export type CommandlineFrameActionTypes =
  | SetCommandlineVisibilityAction
  | ShowCommandlineAction
  | HideCommandlineAction

export interface CommandlineFrameStateInterface {
  hidden: boolean;
}

export type CommandlineFrameState = immutable.RecordOf<CommandlineFrameStateInterface>;
