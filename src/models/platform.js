import { routerRedux } from 'dva/router'
// import { login } from 'services/login'
import { getService } from '../services/login'
import { getLocalStorage } from '../utils'

export default {
  namespace: 'platform',

  state: {
    user_service: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      console.log('333334444')
      history.listen(({ pathname }) => {
        if (pathname === '/platform') {
          dispatch({ type: 'query' })
        }
      })
    },
  },
  effects: {
    * query ({
      payload,
    }, { call, put }) {
      console.log(payload, 'payload')
      const userId = getLocalStorage('user_id')
      console.log(userId, 'userId')
      // const userId = 12
      if (!userId) {
        yield put(routerRedux.push({
          pathname: '/login',
        }))
        return
      }
      console.log('333')
      const data = yield call(getService, {
        user_id: userId,
      })
      // const { locationPathname } = yield select(_ => _.app)
      if (data.success) {
        const user_service = data.data.user_service
        yield put({
          type: 'updateState',
          payload: {
            user_service,
          },
        })
      }
    },
    * goService ({
      payload,
    }, { put }) {
      console.log('payload', payload)
      yield put({
        type: 'app/updateState',
        payload,
      })

      yield put(routerRedux.push({
        pathname: '/',
      }))
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
