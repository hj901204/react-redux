import { message as msg } from 'antd'

// mapData
export const mapData = (data, id = 'id') => {
  data.root = data.root || [] // 很多接口返回的root是null，所以加了个判断，by zxl
  return data.root.reduce((result, item) => {
    result.byId[item[id]] = item
    // 记录当前记录所对应的ID值
    result.allIds.push(item[id])
    return result
  }, { byId: {}, allIds: [], total: parseInt(data.total) })
}

export const updateDataOne = (state, data, id = 'id') => {
  const byId = { ...state.byId, [data[id]]: data }
  const allIds = [...state.allIds]

  if (!~allIds.indexOf(data[id])) {
    allIds.push(data[id])
  }
  return { byId, allIds }
}

export const getListByIds = (byId, allIds) => {
  return allIds.reduce((result, id) => {
    result.push(byId[id])
    return result
  }, [])
}

// 重写message
export const message = {
  info: function info(content, duration, onClose) {
    msg.destroy()
    return msg.info(content, duration, onClose)
  },
  success: function success(content, duration, onClose) {
    msg.destroy()
    return msg.success(content, duration, onClose)
  },
  error: function error(content, duration, onClose) {
    msg.destroy()
    return msg.error(content, duration, onClose)
  },
  warn: function warn(content, duration, onClose) {
    msg.destroy()
    return msg.warn(content, duration, onClose)
  },
  warning: function warning(content, duration, onClose) {
    msg.destroy()
    return msg.warning(content, duration, onClose)
  },
  loading: function loading(content, duration, onClose) {
    msg.destroy()
    return msg.loading(content, duration, onClose)
  }
}

export const getCurrentMenuName = (ctxFrame, user, menus) => {
  return 'purchaser'
}

export const pageOptions = ['10', '20', '40', '50', '80', '100']
