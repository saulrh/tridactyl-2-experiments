import * as m from "mithril"

const proxy = function(vnode: any) {
    var doc = vnode.dom.contentDocument || vnode.dom.contentWindow.document

    if (doc.readyState === "complete") {
        m.render(vnode.dom.contentDocument.documentElement, vnode.children)
    } else {
        setTimeout(function() {
            proxy(vnode)
        }, 0)
    }
}

const Iframe = {
    oncreate: proxy,
    onupdate: proxy,

    view: (vnode: any) => m("iframe", vnode.attrs),
}

const state = {
    text: "",
}
const App = {
    view: () => {
        return m("main", [
            m("h1", "hi there"),
            m("p", state.text),
            // m('input', { oninput: (e: any) => state.text = e.target.value, value: state.text }),
            m(Iframe, [
                m("h1", "hi again"),
                m("p", state.text),
                m("input", {
                    oninput: (e: any) => {
                        state.text = e.target.value
                        m.redraw()
                    },
                    value: state.text,
                }),
            ]),
        ])
    },
}

m.mount(document.body, {
    view: () => m(App),
})

Object.assign(window as any, {
    state,
    m,
})
