import moment from 'moment'

export function hosts(appId) {
  const hosts = (typeof window !== 'undefined' && window.__HOSTS__) || {}
  return hosts[appId]
}

export function cutString(str, len) {
  if (typeof str !== 'string' || !str) {
    return ''
  }
  return str.length > len ? str.substr(0, len) + '...' : str
}

export function formateNumberDateTime(dateNum) {
  if (!dateNum || typeof dateNum !== 'number') {
    return ''
  }
  return moment(dateNum).format('YYYY-MM-DD hh:mm:ss')
}
