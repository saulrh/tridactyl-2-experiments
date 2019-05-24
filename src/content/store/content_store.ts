import { keysReducer } from '@src/content/store/keys/reducers';
import { modeReducer } from '@src/content/store/mode/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { renderImmutable } from '@src/lib/render_immutable';

const rootReducer = combineReducers({
  mode: modeReducer,
  keys: keysReducer,
});

export type ContentState = ReturnType<typeof rootReducer>;

const loggerMiddleware = createLogger({
  stateTransformer: renderImmutable,
});

export function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}

export type ContentStore = ReturnType<typeof configureStore>;
