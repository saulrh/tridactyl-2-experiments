import * as content_store from "@src/content/store/content_store"
import * as mode_actions from "@src/content/store/mode/actions"
import { MODE_NORMAL, MODE_IGNORE } from "@src/content/store/mode/types"
import * as keys_actions from "@src/content/store/keys/actions"
import * as key_listener from "@src/content/key_listener"

const store = content_store.configureStore()

key_listener.startListening(store)
