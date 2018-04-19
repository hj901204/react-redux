import moment from 'moment'
export function formatMoneyToComma(strMoney) {
  if (!strMoney) {
    return ''
  }
  if (typeof strMoney === 'number') {
    strMoney += ''
  }
  return strMoney.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function trimStr(str) {
  if (str === undefined || str === null || typeof str !== 'string') {
    return ''
  }

  return str.trim()
}

export function hosts(appId) {
  const hosts = (typeof window !== 'undefined' && window.__HOSTS__) || {}
  return hosts[appId]
}

export function manipulation(str, len) {
  return str.length > len ? str.substr(0, len) + '...' : str
}
export function formateNumberDateTime(dateNum) {
  if (!dateNum || typeof dateNum !== 'number') {
    return ''
  }
  return moment(dateNum).format('YYYY-MM-DD hh:mm:ss')
}
