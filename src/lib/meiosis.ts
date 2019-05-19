// export interface MeiosisComponent<ComponentStateType, ComponentActionsType> {
//   Initial: () => ComponentStateType
//   Actions: (apply: (ComponentStateType) => ComponentStateType) => ComponentActionsType
// }


// // type ComponentActions<ComponentAction> = (apply: (f: ComponentAction) => void) => { [action: string]: ComponentAction}
// type ArgumentsType<T> = T extends (...args: infer U) => any ? U: never;

// function MapActions<ComponentAction, A extends object, K extends keyof A>(
//   id: keyof IContentState,
//   actions: (apply: (f: ComponentAction) => void) => A,
//   apply: (f: (oldState: ContentState) => ContentState) => void
// ): (apply: (f: ContentAction) => void) => { [K in keyof A]: (...args: ArgumentsType<A[K]>) => void } {
//   return Object.assign(...Object.entries(actions).map(
//     ([k: keyof A, a: A[K]]) => ({
//       [k]: (...args: ArgumentsType<A[K]>) => apply((cs: ContentState) => cs.merge({[id]: a(...args)(cs[id])})),
//     })))
// }



export function MapActions(
  id,
  actions,
  applyForContent,
) {
  // This is an apply() that can be passed to the component
  // transformers which causes their changes to be made to the
  // component's state in the content state.
  function applyForComponent(componentTransformer) {
    applyForContent(contentstate => contentstate.merge({mode: componentTransformer(contentstate[id])}))
  }
  return actions(applyForComponent)
}
