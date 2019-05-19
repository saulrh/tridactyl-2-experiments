import * as mode from "@src/content/mode"
import * as modeindicator from "@src/content/modeindicator"
import * as meiosis from "@src/lib/meiosis"
import { Record, RecordOf } from "immutable"

interface IContentState {
  mode: mode.ModeState
}
const ContentStateFactory = Record<IContentState>({mode: mode.Initial()})
export type ContentState = RecordOf<IContentState>
export type ContentAction = (oldState: ContentState) => ContentState

export function Initial() {
  return ContentStateFactory()
}

export const Actions = (apply: (f: ContentAction) => void) => {
  return {
    mode: meiosis.MapActions("mode", mode, apply),
  }
}

export function View(state: ContentState, actions) {
  modeindicator.View(state.mode)
}
