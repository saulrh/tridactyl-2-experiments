// https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.exportFunction
declare function exportFunction(
  func: (...args: any) => any,
  targetScope: object,
  options?: { defineAs?: string; allowCrossOriginArguments?: boolean },
): (...args: any) => any
