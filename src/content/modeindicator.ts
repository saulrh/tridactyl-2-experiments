import * as flyd from "flyd"
import { Record, RecordOf } from "immutable"
import * as mode from "@src/content/mode"
import * as content from "@src/content"

interface IModeIndicatorState {
  root?: HTMLElement,
}
export type ModeIndicatorState = RecordOf<IModeIndicatorState>
const ModeIndicatorStateFactory = Record<IModeIndicatorState>({})
export type ModeIndicatorAction = (oldState: ModeIndicatorAction) => ModeIndicatorAction

export function Initialize() {
  AddModeIndicator()
}

function AddModeIndicator() {
  const statusIndicator = document.createElement("span")

  try {
    // On quick loading pages, the document is already loaded
    document.body.appendChild(statusIndicator)
  } catch (e) {
    // But on slower pages we wait for the document to load
    window.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(statusIndicator)
    })
  }
}

export function InitialState(): ModeIndicatorState {
  return ModeIndicatorStateFactory({})
}
