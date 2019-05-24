import {
  PUSH_KEY,
  CLEAR_KEYS,
  KeysActionTypes,
  Key,
} from '@src/content/store/keys/types';

export function pushKey(key: Key): KeysActionTypes {
  return {
    type: PUSH_KEY,
    key,
  };
}

export function clearKeys(): KeysActionTypes {
  return {
    type: CLEAR_KEYS,
  };
}
