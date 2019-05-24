import initSubscriber from "redux-subscriber"
import * as content_store from "@src/content/store/content_store"
import * as key_listener from "@src/content/key_listener"

const store = content_store.configureStore()

const subscribe = initSubscriber(store)

key_listener.startListening(store)
