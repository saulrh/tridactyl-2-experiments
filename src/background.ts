import * as rpc from "~rpc"

export const rpcexports = {
    nada: async () => 42,
    err: () => {
        throw Error("hi there")
    },
    submod: {
        val: async x => 8 + x,
        err: () => {
            throw Error("four")
        },
    },
}

export type BGRPCExports = typeof rpcexports

export const knowntabs = <any>[]

browser.runtime.onMessage.addListener((msg: rpc.RPCMsg, sender: rpc.Sender) => {
    knowntabs.push(sender.tab.id)
    return rpc.onMessage(rpcexports)(msg, sender)
})

Object.assign(window as any, {
    rpc,
    knowntabs,
})
