import * as content_store from "@src/content/store/content_store"
import * as keys_actions from "@src/content/store/keys/actions"
import * as dom from "@src/lib/dom"

type KeyboardCallback = (k: KeyboardEvent) => void

function listenToElement(elem: HTMLElement | Window, keyDown: KeyboardCallback, keyUp: KeyboardCallback) {
  elem.removeEventListener("keydown", keyDown, true)
  elem.addEventListener("keydown", keyDown, true)
  elem.removeEventListener("keyup", keyUp, true)
  elem.addEventListener("keyup", keyUp, true)
}

export function startListening(store: content_store.ContentStore) {
  const keyUp = (event: KeyboardEvent) => {
    // store.dispatch(keys_actions.pushKey(event))
  }
  const keyDown = (event: KeyboardEvent) => {
    store.dispatch(keys_actions.pushKey(event))
  }

  listenToElement(window, keyUp, keyDown)
  document.addEventListener(
    "readystatechange",
    _ => dom.getAllDocumentFrames().forEach(
      f => listenToElement(f, keyDown, keyUp)))
}
