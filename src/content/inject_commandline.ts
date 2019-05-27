interface Commandline {
  element: HTMLIFrameElement
  lastHidden?: boolean
}

function setHeight(element: HTMLElement, newHeight: string) {
  element.style.setProperty("height", newHeight, "important")
}

function attemptInjectCommandline(commandline: HTMLIFrameElement) {
  document.documentElement.appendChild(commandline)
  render({element: commandline}, { hidden: true })
}

export function injectCommandline(): Commandline {
  const commandline = window.document.createElementNS(
    "http://www.w3.org/1999/xhtml",
    "iframe",
  ) as HTMLIFrameElement
  commandline.src = browser.extension.getURL("static/commandline.html")
  commandline.id = "tridactyl_meiosis_commandline"
  setHeight(commandline, "0px")
  try {
    attemptInjectCommandline(commandline)
  } catch {
    document.addEventListener(
      "DOMContentLoaded", () => attemptInjectCommandline(commandline))
  }

  return {
    element: commandline,
    lastHidden: true
  }
}

interface CommandlineFrameProps {
  hidden: boolean
}

function renderClassName(props: CommandlineFrameProps) {
  if (props.hidden) {
    return "cleanslate tridactylCommandlineIframe hidden"
  } else {
    return "cleanslate tridactylCommandlineIframe"
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
  const h = getHeight(el, props);
  return `${h}px`
}

export function render(commandline: Commandline, props: CommandlineFrameProps) {
  if (props.hidden === commandline.lastHidden) {
    return
  }

  const newHeight = renderHeight(commandline.element, props)
  commandline.element.className = renderClassName(props);
  setHeight(commandline.element, newHeight)

  if (props.hidden) {
    commandline.element.focus()
  } else {
    commandline.element.blur()
  }

  commandline.lastHidden = props.hidden
}
