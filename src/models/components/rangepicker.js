
import moment from 'moment'
const year = Number(moment().format("YYYY")),
      month = Number(moment().format("M")),
      day = Number(moment().format("D"));
export default {
  namespace: 'rangepicker',
  state: {
    year: year,
    month: month,
    curYear: year,
    curMonth: month,
    curDay: day
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
