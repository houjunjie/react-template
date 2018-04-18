
// import { tokenVerfy, setLocalStorage } from '../utils'
import modelExtend from 'dva-model-extend'
import common from '../common'
import { queryCity, querySonglist } from 'services/advertising'
export default modelExtend(common.pageModel, {
  namespace: 'resourceslock',
  state: {
    province: [],
    city: [],
    area: [],
    selectedRowKeys: [],
    list: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/advertising') {
          dispatch({ type: 'queryProvinceList' })
        }
      })
    }
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
    * queryCityList ({ payload }, { call, put }) {
      const data = yield call(queryCity, payload)
      if (data.success) {
        const { administrative_division } = data.data
        console.log('administrative_division', administrative_division)
        yield put({
          type: 'updateState',
          payload: {
            city: administrative_division
          }
        })
      } else {
        throw data
      }
    },
    * queryAreaList ({ payload }, { call, put }) {
      const data = yield call(queryCity, payload)
      if (data.success) {
        const { administrative_division } = data.data
        yield put({
          type: 'updateState',
          payload: {
            area: administrative_division
          }
        })
      } else {
        throw data
      }
    },
    * querySonglist ({ payload }, { call, put }) {
      const data = yield call(querySonglist, payload)
      if (data.success) {
        // const { administrative_division } = data.data
        // yield put({
        //   type: 'updateState',
        //   payload: {
        //     province: administrative_division
        //   }
        // })
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
    }
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
