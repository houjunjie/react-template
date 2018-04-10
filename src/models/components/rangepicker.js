
import moment from 'moment'

export default {
  namespace: 'rangepicker',
  state: {
    year: moment().format("YYYY"),
    month: moment().format("M"),
  },
  subscriptions: {

  },
  effects: {

  },
  reducers: {
    updataState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  }
}
