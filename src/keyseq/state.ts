import produce from "immer"

import { Updates, mutator } from "~content"

export type KeyseqState = Readonly<{
    keys: string[]
}>

export const KeyseqInitial: KeyseqState = {
    keys: [],
}

export const keyseqActions = {
    keydown: (key: string) =>
        mutator(({ keyseq }) => {
            keyseq.keys.push(key)
        }),
}
