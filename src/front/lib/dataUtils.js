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
  '11': '100%',
  '12': '100%'
}

export function getOrderStatusName(status) {
  return status ? orderStatus[status] : ''
}

export function getOrderProgress(status) {
  return status ? orderProgress[status] : ''
}
