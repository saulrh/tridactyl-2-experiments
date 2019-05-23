import * as immutable from "immutable"
import * as content from "@src/content"
import * as dom from "@src/lib/dom"

interface IKey {
}
export type Key = immutable.RecordOf<IKey>;

function ListenForKeys(element, eventHandler) {
  element.addEventListener("keydown", eventHandler, true)
}

const KeyHandler = (actions) => (event: KeyboardEvent) => {
  console.log("keyhandler", event)
  if (event.key === "v") {
    console.log("got v")
    actions.mode.ChangeMode("normal")
  } else if (event.key === "c") {
    console.log("got c")
    actions.mode.ChangeMode("ignore")
  }
}

export function Initialize(actions) {
  ListenForKeys(window, KeyHandler(actions))
  document.addEventListener(
    "readystatechange",
    _ => dom.getAllDocumentFrames().forEach(el => ListenForKeys(el, KeyHandler(actions))),
  )
}
