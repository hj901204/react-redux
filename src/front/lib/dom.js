// 触发dom 事件
export const dispatchEvent = (node, eventName) => {
  let event = null
  try {
    event = new Event(eventName, {bubbles: true, cancelable: false})
  } catch (e) {
    event = document.createEvent('Event')
    event.initEvent(eventName, true, true)
  }

  node.dispatchEvent(event)
}
