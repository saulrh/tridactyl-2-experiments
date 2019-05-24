// import * as immutable from "immutable"
// import * as keys from "@src/content/keys"

// type Mode =
//   | "normal"
//   | "ignore"
//   | "gobble"

// interface IKeySeqModeConfig {
//   binds: [],
//   maps: [],
//   noremaps: [],
//   onUnmatched: undefined,
// }
// export type KeySeqModeConfig = immutable.RecordOf<IKeySeqModeConfig>

// interface IKeySeqState {
//   keys: immutable.List<keys.Key>,
//   config: { [mode in Mode]: KeySeqModeConfig },
// }

// interface IGobbleState {
//   toGobble?: number,
//   gobbled: immutable.List<keys.Key>,
// }

// export type GobbleState = immutable.RecordOf<IGobbleState>;

// // Complete minimal state for the tridactyl client.
// //
// // Minimal because the smaller the state the simpler and fewer the actions and
// // reducers.
// //
// // Excludes:
// //      - all config that can be delivered asynchronously from the background
// //      - DOM
// //
// // Includes:
// //      - everything required to run the keyseq parser
// //      - the minimum required to draw the UI
// //
// // Todo:
// //      - Read some Elm/Om/redux stuff about who should own state.
// //      - Possibly have a look at vim vixen, saka key, vimium and see if their
// //        state model looks very different.
// //
// // So what's in the background?
// //      - Persistent storage
// //      - Helper functions for accessing browser.*
// //              - Minimise these by use of browser proxy
// //              - Could even proxy listeners.
// //              - Completions and other performance sensitive stuff will
// //                probably still have background components.
// //              - A cut-down version of runtime-dispatch can deal with that.
// //      - Native messenger API?
// export interface ContentState {
//   mode: Mode,
//   keyseq: IKeySeqState,

//   // Mode specific:
//   //
//   //     Hinting and find are functions of cmdline, dom and settings, but we
//   //     will want to cache at least the results of filtering the DOM. Could
//   //     have a dom-operation cache and still no mode-specific state?
//   //
//   //     gobble mode needs the number of keys it should listen for
//   gobble: GobbleState,

//   // If we end up needing a cache, then it will go here, too.
// }

// export function InitialState(): ContentState {
//   return {
//     mode: "normal",
//     keyseq: {
//       keys: immutable.List<keys.Key>([]),
//       config: {
//         normal: immutable.Record<IKeySeqModeConfig>({
//           binds: [],
//           maps: [],
//           noremaps: [],
//           onUnmatched: undefined,
//         })(),
//         ignore: immutable.Record<IKeySeqModeConfig>({
//           binds: [],
//           maps: [],
//           noremaps: [],
//           onUnmatched: undefined,
//         })(),
//         gobble: immutable.Record<IKeySeqModeConfig>({
//           binds: [],
//           maps: [],
//           noremaps: [],
//           onUnmatched: undefined,
//         })(),
//       },
//     },
//     gobble: immutable.Record<IGobbleState>({
//       gobbled: immutable.List<keys.Key>([])
//     })(),
//   }
// }
