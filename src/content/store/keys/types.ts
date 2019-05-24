import * as immutable from 'immutable';

export const PUSH_KEY = '@keys/PUSH_KEY';
interface PushKeyAction {
  type: typeof PUSH_KEY;
  key: Key;
}

export const CLEAR_KEYS = '@keys/CLEAR_KEYS';
interface ClearKeysAction {
  type: typeof CLEAR_KEYS;
}

export type KeysActionTypes = PushKeyAction | ClearKeysAction;

export interface Key {
  key: string;
}

export interface KeysStateInterface {
  keys: immutable.List<Key>;
}
export type KeysState = immutable.RecordOf<KeysStateInterface>;
