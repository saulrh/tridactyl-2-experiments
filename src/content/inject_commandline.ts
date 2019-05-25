import * as commandline_types from "@src/content/store/commandline_frame/types"
import * as commandline_reducers from "@src/content/store/commandline_frame/reducers"

interface Commandline {
  element: HTMLIFrameElement
  lastState: commandline_types.CommandlineFrameState
}

export function injectCommandline(): Commandline {
  const commandline = window.document.createElementNS(
    "http://www.w3.org/1999/xhtml",
    "iframe",
  ) as HTMLIFrameElement
  commandline.height = "0px"
  commandline.className = renderClassName({hidden: true})
  commandline.src = browser.extension.getURL("static/commandline.html")
  commandline.id = "tridactyl_commandline"
  try {
    console.log("attempting to append commandline")
    document.documentElement.appendChild(commandline)
    console.log("appended commandline")
  } catch {
    console.log("error while attempting to append commandline, deferring")
    document.addEventListener("DOMContentLoaded", () => {
      console.log("attempting to append commandline deferred")
      document.documentElement.appendChild(commandline)
      console.log("appended commandline deferred")
    })
  }

  return {
    element: commandline,
    lastState: commandline_reducers.initialState,
  }
}

interface CommandlineFrameProps {
  hidden: boolean
}

function renderClassName(props: CommandlineFrameProps) {
  if (props.hidden) {
    return "cleanslate tridactylCommandlineIframe"
  } else {
    return "cleanslate tridactylCommandlineIframe hidden"
  }
}

function getHeight(el: HTMLIFrameElement, props: CommandlineFrameProps): number {
  if (props.hidden || !el.contentWindow) {
    return 0;
  } else {
    return el.contentWindow.document.body.offsetHeight;
  }
}

function renderHeight(el: HTMLIFrameElement, props: CommandlineFrameProps): string {
  return `${renderHeight(el, props)}px`
}

export function render(commandline: Commandline, props: CommandlineFrameProps) {
  if (props.hidden == commandline.lastState.hidden) {
    return
  }

  commandline.element.className = renderClassName(props);
  commandline.element.style.height = renderHeight(commandline.element, props);

  if (props.hidden) {
    commandline.element.focus()
  } else {
    commandline.element.blur()
  }
}
