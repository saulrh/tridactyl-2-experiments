import {
  HIDE_COMMANDLINE,
  SHOW_COMMANDLINE,
  SET_COMMANDLINE_VISIBILITY,
  CommandlineFrameActionTypes,
} from "@src/content/store/commandline_frame/types"

export function hideCommandline(): CommandlineFrameActionTypes {
  return {
    type: HIDE_COMMANDLINE
  }
}

export function showCommandline(): CommandlineFrameActionTypes {
  return {
    type: SHOW_COMMANDLINE
  }
}

export function setCommandlineVisibility(hidden: boolean): CommandlineFrameActionTypes {
  return {
    type: SET_COMMANDLINE_VISIBILITY,
    hidden,
  }
}
