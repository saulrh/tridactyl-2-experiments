import * as m from 'mithril'

const proxy = function(vnode: any){
    var doc = vnode.dom.contentDocument || vnode.dom.contentWindow.document;

    if (doc.readyState === "complete") {
        m.render( vnode.dom.contentDocument.documentElement, vnode.children )
    } else{
        setTimeout(function(){proxy(vnode);},0);
    }
}

export const Iframe = {
    oncreate: proxy,
    onupdate: proxy,

    view: () =>
        m('iframe', {src: browser.runtime.getURL('blank.html')})
}

export default Iframe
