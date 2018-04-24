
// import { tokenVerfy, setLocalStorage } from '../utils'
import modelExtend from 'dva-model-extend'
import common from '../common'
import { queryAdvertisers } from 'services/advertising'
export default modelExtend(common.pageModel, {
  namespace: 'userList',
  state: {

  },
  effects: {
    * query ({ payload }, { call, put }) {
      const data = yield call(queryAdvertisers, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.current_page) || 1,
              pageSize: Number(payload.per_page) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
  }
})
