
// mapData
export const mapData = (state, data, id = 'id') => {
  return data.root.reduce((result, item) => {
    result.byId[item[id]] = item
    result.allIds.push(item[id])
    return result
  }, {byId: state.byId, allIds: [], total: parseInt(data.total)})
}

export const updateDataOne = (state, data, id = 'id') => {
  const byId = {...state.byId, [data[id]]: data}
  const allIds = [...state.allIds]

  if (!~allIds.indexOf(data[id])) {
    allIds.push(data[id])
  }
  return {byId, allIds}
}

export const deleteData = (state, id) => {
  const ids = String(id).split(',')
  const allIds = state.allIds.filter(id => !~ids.indexOf(String(id)))

  return {
    allIds
  }
}
