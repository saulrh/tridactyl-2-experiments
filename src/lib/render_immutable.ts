import * as immutable from "immutable"

export function renderImmutable(state) {
  let rendered = {}
  for (const i in state) {
    const v = state[i]
    if (immutable.isImmutable(v)) {
      rendered[i] = v.toJS();
    } else {
      rendered[i] = v
    }
  }
  return rendered
}
