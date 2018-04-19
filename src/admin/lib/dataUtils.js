export const orderStatus = {
  '1': '提交订单',
  '2': '已确认',
  '13': '已付定金',
  '3': '已计划',
  '4': '开始生产',
  '5': '打磨完成',
  '6': '压印完成',
  '7': '气动压印完成',
  '8': '检验',
  '9': '生产完工',
  '14': '已付尾款',
  '10': '待收货',
  '11': '收货确认',
  '12': '完成'
}

export const orderProgress = {
  '1': '10%',
  '2': '20%',
  '13': '25%',
  '3': '30%',
  '4': '40%',
  '5': '50%',
  '6': '60%',
  '7': '70%',
  '8': '80%',
  '9': '90%',
  '14': '95%',
  '10': '95%',
  '11': '95%',
  '12': '100%'
}

export const priceObj = {
  'A': {materialPrice: 126, processPrice: 27, transportPrice: 9, managePrice: 18, totalPrice: 180},
  'B': {materialPrice: 154, processPrice: 33, transportPrice: 11, managePrice: 22, totalPrice: 220},
  'C': {materialPrice: 196, processPrice: 42, transportPrice: 14, managePrice: 28, totalPrice: 280}
}

export function getImgByCode(code) {
  switch (code) {
    case 'A':
      return '/images/l1.jpg'
    case 'B':
      return '/images/l2.jpg'
    case 'C':
      return '/images/l3.jpg'
    default:
      return ''
  }
}

export function getCusImgByCode(code) {
  switch (code) {
    case 'A':
      return '/images/c1.jpg'
    case 'B':
      return '/images/c2.jpg'
    case 'C':
      return '/images/c3.jpg'
    default:
      return ''
  }
}

export function getGoodsCodeByCode(code) {
  switch (code) {
    case 'A':
      return '11852'
    case 'B':
      return '11852'
    case 'C':
      return '11852'
    default:
      return ''
  }
}

export function getGoodsNameImgByCode(code) {
  switch (code) {
    case 'A':
      return '金属名片台'
    case 'B':
      return '金属名片台'
    case 'C':
      return '金属名片台'
    default:
      return ''
  }
}

export function getOrderStatusName(status) {
  return status ? orderStatus[status] : ''
}

export function getOrderProgress(status) {
  return status ? orderProgress[status] : ''
}
