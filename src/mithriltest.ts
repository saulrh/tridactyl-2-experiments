import * as m from 'mithril'

const proxy = function(vnode: any){
  var doc = vnode.dom.contentDocument || vnode.dom.contentWindow.document;

  if (doc.readyState === "complete") {
    m.render( vnode.dom.contentDocument.documentElement, vnode.children )
  } else{
    setTimeout(function(){proxy(vnode);},0);
  }
}

const Iframe = {
  oncreate : proxy,
  onupdate : proxy,

  view : (vnode: any) =>
    m( 'iframe', vnode.attrs )
}

m.render(document.body, m('main', [
    m('h1', 'hi there'),
    m('p', 'foo'),
    m(Iframe, [
	m('h1', 'hi again')
    ])
]))
