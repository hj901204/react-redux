const Storage = {}
// set
Storage.set = (key, value) => {
  if (!window.localStorage) {
    return null
  }
  if (typeof value === 'object' && value !== null) {
    try {
      value = JSON.stringify(value)
    } catch (e) {}
  }
  window.localStorage.setItem(key, value)
}

Storage.get = (key, defaultValue) => {
  if (!window.localStorage) {
    return null
  }

  let value = window.localStorage.getItem(key)
  try {
    let obj = JSON.parse(value)
    if (typeof obj === 'object' && obj !== null) {
      value = obj
    }
  } catch (e) {}
  return value
}

Storage.remove = key => {
  if (!window.localStorage) {
    return null
  }
  window.localStorage.removeItem(key)
}

Storage.clear = () => {
  if (!window.localStorage) {
    return null
  }
  window.localStorage.clear()
}

export default Storage
