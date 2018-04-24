
// import { tokenVerfy, setLocalStorage } from '../utils'
import modelExtend from 'dva-model-extend'
import common from '../common'
import { queryCity, queryStores, addStore, queryStoreList } from 'services/advertising'

export default modelExtend(common.pageModel, {
  namespace: 'register',
  state: {

  },
  subscriptions: {

  },
  effects: {
    * queryProvinceList ({ payload }, { call, put }) {
      const data = yield call(queryCity, { ...payload, level_num: 1})
      if (data.success) {
        const { administrative_division } = data.data
        yield put({
          type: 'updateState',
          payload: {
            province: administrative_division
          }
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
