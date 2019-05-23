import { Record, RecordOf } from "immutable"
import * as content from "@src/content"
import * as state from "@src/content/state"

export type Mode =
  | "normal"
  | "ignore"

export function Actions(action_stream: flyd.Stream<content.ContentAction>) {
  return {
    ChangeMode: (newMode: Mode) => action_stream(
      (state, actions) => state.merge({mode: newMode})
    ),
  }
}
