// Type definitions for patchinko v4.1.0
// Project: patchinko
// Typescript: 3.1.6
// Definitions by: Jules Samuel Randolph <https://github.com/jsamr>

// Until this is PR'd into patchinko proper, copied and pasted from
// https://gist.github.com/jsamr/1e95b21d9d6f609f320c60ee917ab306

declare module 'patchinko' {
    type DeepPartial<T> = {
      [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
    }
    // Utility types
    export type Primitive<T> = T extends number ? number :
      T extends string ? string :
      T extends boolean ? boolean :
      never
    // Symbols for unique proxies
    export const PSSymbol: unique symbol
    export const SSymbol: unique symbol
    export const DSymbol: unique symbol
    export type PatchInstructionSymbol = typeof PSSymbol | typeof SSymbol | typeof DSymbol

    export interface PSPatchInstruction<Q> {
      [PSSymbol]: Q
    }
    export interface DPatchInstruction<Q> {
      [DSymbol]: Q
    }
    export interface SPatchInstruction<Q> {
      [SSymbol]: Q
    }

    /**
     * Instructions may be nested.
     */
    export type NestedPSPatchInstruction<P> = PSPatchInstruction<P> | PSPatchInstruction<PatchRequest<P>>
    export type NestedSPatchInstruction<P> = SPatchInstruction<P> | SPatchInstruction<PatchRequest<P>>

    /**
     * Instructions returned by patchinko functions.
     * Instructions cannot wrap primitives.
     */
    export type PatchInstruction<P> = P extends Primitive<P> ? never : NestedPSPatchInstruction<P> | DPatchInstruction<P> | NestedSPatchInstruction<P>

    /**
     * A full Patch replacement, with no nested instructions.
     */
    export type WholesomePatch<M> = {
      [P in keyof M]: P extends PatchInstructionSymbol ? never : M[P]
    }

    /**
     * A patch function.
     */
    export type PatchFunction<M> = (m: M) => PatchRequest<M>

    /**
     * A set of patch instructions, nested in hierarchy
     */
    export type PatchInstructions<M> = {
      [P in keyof M]: P extends PatchInstructionSymbol ? never : M[P] extends Primitive<M[P]> ? M[P] : PatchInstruction<M[P]> | WholesomePatch<M[P]>
    }
    /**
     * A patch request object.
     */
    export type PatchRequest<M> = PatchFunction<M> | PatchInstructions<M>

    export type P = <M extends object>(m: M, p: PatchRequest<M>, ...pp: PatchRequest<M>[]) => M

    export type PS = <M extends object>(p: PatchRequest<M>) => PSPatchInstruction<M>

    export type D = <M>() => DPatchInstruction<M>

    export type S = <M>(closure: (m: M) => PatchRequest<M>) => SPatchInstruction<M>

    export interface Overloaded {
      /* P  */ <M extends object>(m: M, p: PatchRequest<M>, ...pp: PatchRequest<M>[]): M
      /* PS */ <M extends object>(p: PatchRequest<M>): PSPatchInstruction<M>
      /* D  */ <M>(): DPatchInstruction<M>
      /* S  */ <M>(closure: (m: M) => PatchRequest<M>): SPatchInstruction<M>
    }
    export const immutable: Overloaded
    export const constant: Overloaded
    export const P: P
    export const PS: PS
    export const D: D
    export const S: S
}

declare module 'patchinko/immutable' {
  import { immutable } from 'patchinko'
  export = immutable
}

declare module 'patchinko/constant' {
  import { constant } from 'patchinko'
  export = constant
}

declare module 'patchinko/explicit' {
  export { P, PS, D, S } from 'patchinko'
}
