import * as content_store from '@src/content/store/content_store';
import * as keys_actions_sync from '@src/content/store/keys/actions_sync';
// import * as dom from '@src/lib/dom';

function listenToWindow(
  elem: Window,
  keyDown: (evt: KeyboardEvent) => void,
  keyUp: (evt: KeyboardEvent) => void
) {
  elem.addEventListener('keydown', keyDown, true);
  elem.addEventListener('keyup', keyUp, true);
}

function listenToElement(
  elem: HTMLElement,
  keyDown: (evt: KeyboardEvent) => void,
  keyUp: (evt: KeyboardEvent) => void
) {
  elem.addEventListener('keydown', keyDown, true);
  elem.addEventListener('keyup', keyUp, true);
}

export function startListening(store: content_store.ContentStore) {
  const keyDown = (event: KeyboardEvent) => {
    store.dispatch(keys_actions_sync.pushKey(event));
  };
  const keyUp = (event: KeyboardEvent) => {
    // store.dispatch(keys_actions.pushKey(event))
  };

  listenToWindow(window, keyUp, keyDown);
  // document.addEventListener('readystatechange', async _ => {
  //   dom.getAllDocumentFrames().forEach(f => listenToElement(f, keyDown, keyUp))
  // });
}
