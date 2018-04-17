
import { queryCity } from 'services/advertising'
// import { tokenVerfy, setLocalStorage } from '../utils'

export default {
  namespace: 'advertising',
  state: {
    province: [],
    city: [],
    area: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/advertising') {
          dispatch({ type: 'queryCityList' })
        }
      })
    }
  },
  effects: {
    * queryCityList ({ payload }, { call, put }) {
      const data = yield call(queryCity, payload)
      if (data.success) {
        const { administrative_division } = data.data
        yield put({
          type: 'updateState',
          payload: {
            province: administrative_division
          }
        })
        // yield put({
        //   type: 'querySuccess',
        //   payload: {
        //     list: administrative_division.data,
        //     pagination: {
        //       current: Number(payload.current_page) || 1,
        //       pageSize: Number(payload.per_page) || 10,
        //       total: administrative_division.total,
        //     },
        //   },
        // })
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
}
