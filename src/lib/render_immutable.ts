import * as immutable from 'immutable';

export function renderImmutable<T extends {}, K extends keyof T>(state: T) {
  return Object.keys(state).reduce((acc, el) => {
    if (immutable.isImmutable(el)) {
      return el.toJS();
    } else {
      return el;
    }
  }, {});
}
