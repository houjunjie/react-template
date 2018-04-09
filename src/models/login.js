import { routerRedux } from 'dva/router'
import { login } from '../services/login'
import { tokenVerfy, setLocalStorage } from '../utils'

export default {
  namespace: 'login',

  state: {
    user_service: [],
  },

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      // const { locationQuery } = yield select(_ => _.app)
      // console.log('locationQuery', locationQuery, data)
      const user = JSON.parse(tokenVerfy(data.data.jwt))
      console.log('user', user, typeof user, user.user_id)
      if (data.success) {
        // const { from } = locationQuery
        // window.localStorage.setItem('user_id', JSON.stringify(user.user_id))
        setLocalStorage('user_id', user.user_id, user.exp)
        // yield put({
        //   type: 'platform/query',
        //   user_id: user.user_id,
        // })
        yield put(routerRedux.push('/platform'))
        // if (from && from !== '/login') {
          // yield put(routerRedux.push(from))
        // } else {
          // yield put(routerRedux.push('/platform'))
        // }
      } else {
        throw data
      }
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
