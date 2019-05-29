import * as flyd from "flyd"
import produce from "immer"
import * as m from 'mithril'
import TriInput from "~/components/input"

import {KeyseqState, keyseqActions, KeyseqInitial} from '~/keyseq/state';

/*
 * Meiosis demo in typescript with immutable state.
 *
 * Patchinko was considered, but the type definitions aren't as good.
 *
 * Immutable.js was originally used, but the type checking for deep edits isn't
 * as good as for immer.
 *
 * The actions are a bit verbose, but less so than redux and we could write
 * some helpers or adapt something like patchinko to make it less so.
 */

/**** TYPES ****/

type ModeType = 'normal' | 'ignore'

// KeySeq and Mode states could trivially be moved elsewhere if that becomes useful.

// Readonly is not recursive, but that's OK
export type ContentState = Readonly<{
    keyseq: KeyseqState,
    mode: {
        current: ModeType
        previous?: ModeType
    },
    uiframe: {
        visible: boolean,
        mounted: boolean,
        root?: HTMLElement,
        commandline: {
            text: string
        }
    },
}>

const initial: ContentState = {
    keyseq: KeyseqInitial,
    mode: {
        current: 'normal',
    },
    uiframe: {
        visible: false,
        mounted: false,
        commandline: {
            text: '',
        }
    },
}

export type Updater = (model: ContentState) => ContentState

export type Updates = flyd.Stream<Updater>
export type Models = flyd.Stream<ContentState>

export type Action = (...args: any[]) => Updates
export type Actions = {
    [key: string]: Action
}

/**** Actions ****/

// Helper functions to make using produce a bit less frustrating.
export type Mutator = (model: ContentState) => void
export const mutator = (updates: Updates, fn: Mutator) =>
    updates(model => produce(model, fn))

const createActions = (updates: Updates) => ({ // : { [key: string]: Actions } => ({
    mode: modeActions(updates),
    keyseq: keyseqActions(updates),
    uiframe: {
        oninput: (val: string) => mutator(updates, ({uiframe}) => { uiframe.commandline.text = val }),
        mount: () => mutator(updates, model => {
            const root = document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
            document.documentElement.appendChild(root)
            model.uiframe.mounted = true
            model.uiframe.root = root
        }),
        unmount: () => mutator(updates, ({uiframe}) => {
            uiframe.root.remove()
            uiframe.mounted = false
            uiframe.root = undefined
        }),
        setvisible: (vis: boolean) => mutator(updates, ({uiframe}) => {
            uiframe.visible = vis
        }),
    }
})

// Imagine these are bigger and maybe imported from different files.
const modeActions = (updates: Updates): Actions => ({
    change_mode: (newmode: ModeType) =>
        mutator(updates,
                ({mode}) => { mode.current = newmode })
})

// If we ever need state/actions that require a dynamic key in the state object.
// const moveableActions = (updates: Updates, id: keyof State) => ({
//     someaction: () => updates(model =>
//      produce(model, ({[id]}) => void (id.foo = 1)))
// })


/**** Meiosis setup ****/

const updates: Updates = flyd.stream()
const models: Models = flyd.scan((state: ContentState, fn: Updater) => fn(state), initial, updates)

const actions = createActions(updates)

export type ContentActions = typeof actions

// Views

models.map(m => console.log(m.uiframe, m.mode, m.keyseq))
models.map(m => console.log(m.keyseq.keys))

/**
 * Render all of our visible UI if it should be visible.
 *
 * If it shouldn't be visible, completely remove it.
 */
models.map(model => {
    if (model.uiframe.visible) {
        if (!model.uiframe.mounted) {
            actions.uiframe.mount()
            return
        }
        m.render(model.uiframe.root, m(App, { model: models(), actions }))
    } else if (model.uiframe.mounted) {
        actions.uiframe.unmount()
    }
})

// Listeners

addEventListener("keydown", (ke: KeyboardEvent) => actions.keyseq.keydown(ke.key))
addEventListener("keydown", (ke: KeyboardEvent) =>
    ke.key === 't' && (document.location.href = browser.runtime.getURL('test.html')))

// RPC

// TODO:
// Combine RPC funcs from other files (namespaced)

import * as rpc from '~rpc'

export const rpcexports = {
    stat: async () => models().mode.current,
    nada: async () => 42,
    err: () => { throw Error('hi there') },
}

browser.runtime.onMessage.addListener(rpc.onMessage(rpcexports))

addEventListener('keydown', ke =>
    ke.key === 'x' && rpc.rpc('background').nada())

addEventListener('keydown', ke =>
    ke.key === 'c' && rpc.rpc('background').submod.val(1))

addEventListener('keydown', ke =>
    ke.key === 'o' && actions.uiframe.setvisible(!models().uiframe.visible))

Object.assign((window as any), {
    rpc,
})

// Iframe experiments

import Iframe from '~/components/iframe'

export type ContentAttrs = {
    model: ContentState,
    actions: ContentActions
}

export interface Component<Attrs = ContentAttrs> {
    view: (vnode: m.Vnode<Attrs>) => m.Children | null | void
}

const App: m.Component<ContentAttrs> = {
    view: ({attrs: {model, actions}}) =>
        model.uiframe.visible && m(Iframe,
            {
                src: browser.runtime.getURL('blank.html'),
                style: {
                    position: 'fixed',
                    bottom: 0,
                    border: 0,
                    padding: 0,
                    margin: 0,
                    width: '100%',
                },
            },
            [
                m("head", [
                    m("title", "Tridactyl Commandline"),
                    m("link", { href: "static/css/commandline.css", rel: "stylesheet" })
                ]),
                m("body", [
                    m('div', model.keyseq.keys.join(", ")),
                    m(TriInput, {model, actions})
                ])
            ])
}
