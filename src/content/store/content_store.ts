import { keysReducer } from "@src/content/store/keys/reducers"
import { modeReducer } from "@src/content/store/mode/reducers"
import { createStore, combineReducers } from "redux"

const rootReducer = combineReducers({
  mode: modeReducer,
  keys: keysReducer,
})

export type ContentState = ReturnType<typeof rootReducer>;

export function MakeContentStore() {
  return createStore(
    rootReducer,
  )
}

export type ContentStore = ReturnType<typeof MakeContentStore>
