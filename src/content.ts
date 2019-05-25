import * as content_store from '@src/content/store/content_store';
import * as key_listener from '@src/content/key_listener';
import * as inject_commandline from "@src/content/inject_commandline";

console.log("loaded")
const store = content_store.configureStore();

// Start listening for keyboard stuff
console.log("start listening to keys")
key_listener.startListening(store);
console.log("done listening to keys")

// Inject the commandline app and hook it up to the state.
console.log("injecting commandline")
const commandline = inject_commandline.injectCommandline();
console.log("injected commandline")
const unsub_commandline = store.subscribe(() => {
  inject_commandline.render(commandline, store.getState().commandlineFrame)
})
