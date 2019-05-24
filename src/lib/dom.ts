// // From saka-key lib/dom.js, under Apachev2

// type AnyFrame = HTMLIFrameElement | HTMLFrameElement;

// function getDocument(f: AnyFrame): Document | undefined {
//   if (f.contentDocument) {
//     return f.contentDocument;
//   }
//   if (f.contentWindow && f.contentWindow.document) {
//     return f.contentWindow.document;
//   }
//   return;
// }

// /** Return all frames that belong to the document (frames that belong to
//  * extensions are ignored).
//  *
//  * @param doc   The document the frames should be fetched from
//  */
// export function getAllDocumentFrames(doc = document): AnyFrame[] {
//   if (!(doc instanceof HTMLDocument)) return [];

//   const frames = (Array.from(
//     doc.getElementsByTagName('iframe')
//   ) as AnyFrame[])
//     .concat(Array.from(doc.getElementsByTagName('frame')) as AnyFrame[])
//     .filter(frame => !frame.src.startsWith('moz-extension://'));
//   return frames.concat(
//     frames.reduce((acc: AnyFrame[], f: AnyFrame) => {
//       // Errors could be thrown because of CSP
//       try {
//         return acc.concat(getAllDocumentFrames(getDocument(f)));
//       } catch (e) {
//         return acc;
//       }
//     }, [])
//   );
// }
