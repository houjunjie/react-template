
// import { tokenVerfy, setLocalStorage } from '../utils'
import modelExtend from 'dva-model-extend'
import common from '../common'
import { queryAdvertisers } from 'services/advertising'
console.log('namespace', common)
export default modelExtend(common.pageModel, {
  namespace: 'advertiser',
  state: {
  },
  effects: {
    * query ({ payload }, { call, put }) {
      console.log('payload', payload)
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
    }
  }
})
