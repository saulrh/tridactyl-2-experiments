// From saka-key lib/dom.js, under Apachev2

/** Return all frames that belong to the document (frames that belong to
 * extensions are ignored).
 *
 * @param doc   The document the frames should be fetched from
 */
export function getAllDocumentFrames(doc = document) {
    if (!(doc instanceof HTMLDocument)) return []
    const frames = (Array.from(doc.getElementsByTagName("iframe")) as HTMLIFrameElement[] & HTMLFrameElement[])
        .concat(Array.from(doc.getElementsByTagName("frame")))
        .filter(frame => !frame.src.startsWith("moz-extension://"))
    return frames.concat(
        frames.reduce((acc, f) => {
            // Errors could be thrown because of CSP
            let newFrames = []
            try {
                const doc = f.contentDocument || f.contentWindow.document
                newFrames = getAllDocumentFrames(doc)
            } catch (e) {}
            return acc.concat(newFrames)
        }, []),
    )
}

export const hintworthy_js_elems = []

/** Adds or removes an element from the hintworthy_js_elems array of the
 *  current tab.
 *
 *  @param {EventTarget} elem  The element add/removeEventListener is called on
 *  @param {boolean} add       true when called from addEventListener,
 *                             false from removeEventListener
 *  @param {string} event      The event name given to add/removeEventListener
 *
 *  This function must be security reviewed when Custom Elements land in Firefox
 *  https://bugzilla.mozilla.org/show_bug.cgi?id=1406825
 *
 *  This function is exported to the web content window but should only be
 *  callable from our modified add/removeEventListener because we remove the
 *  reference to it before web content runs (if added afterwards a
 *  mutationobserver on the window object would probably capture a reference to
 *  this function).
 *
 *  Just in case web content does get a direct reference or the built-in
 *  add/removeEventListener code doesn't validate elem correctly, this function
 *  must assume that its inputs are potentially malicious.
 */
export function registerEvListenerAction(
  elem: EventTarget,
  add: boolean,
  event: string,
) {
  // We're only interested in the subset of EventTargets that are Elements.
  if (!(elem instanceof Element)) {
    return
  }

  // Prevent bad elements from being processed
  //
  // This is defence in depth: we should never receive an invalid elem here
  // because add/removeEventListener currently throws a TypeError if the given
  // element is not a standard library EventTarget subclass.
  try {
    // Node prototype functions work on the C++ representation of the
    // Node, which a faked JS object won't have.
    // hasChildNodes() is chosen because it should be cheap.
    Node.prototype.hasChildNodes.apply(elem)
  } catch (e) {
    // Don't throw a real exception because addEventListener wouldn't and we
    // don't want to break content code.
    console.log("Elem is not a real Node", elem)
    return
  }

  switch (event) {
    case "click":
    case "mousedown":
    case "mouseup":
    case "mouseover":
      if (add) {
        hintworthy_js_elems.push(elem)
      } else {
        // Possible bug: If a page adds an event listener for "click" and
        // "mousedown" and removes "mousedown" twice, we lose track of the
        // elem even though it still has a "click" listener.
        // Fixing this might not be worth the added complexity.
        const index = hintworthy_js_elems.indexOf(elem)
        if (index >= 0) hintworthy_js_elems.splice(index, 1)
      }
  }
}

/** Replace the page's addEventListener with a closure containing a reference
 *  to the original addEventListener and [[registerEvListenerAction]]. Do the
 *  same with removeEventListener.
 */
export function hijackPageListenerFunctions(): void {
  const exportedName = "registerEvListenerAction"
  exportFunction(registerEvListenerAction, window, { defineAs: exportedName })

  const eval_str = ["addEventListener", "removeEventListener"].reduce(
    (acc, cur) => `${acc};
EventTarget.prototype.${cur} = ((realFunction, register) => {
return function (...args) {
let result = realFunction.apply(this, args)
try {
register(this, ${cur === "addEventListener"}, args[0])
} catch (e) {
// Don't let the page know something wrong happened here
}
return result
}
})(EventTarget.prototype.${cur}, ${exportedName})`,
    "",
  )

  window.eval(eval_str + `;delete ${exportedName}`)
}
