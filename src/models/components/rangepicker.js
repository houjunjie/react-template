
import moment from 'moment'
const year = Number(moment().format("YYYY")),
      month = Number(moment().format("M")),
      day = moment().format("YYYY-MM-DD");
export default {
  namespace: 'rangepicker',
  state: {
    year: year,
    month: month,
    curYear: year,
    curMonth: month,
    curDay: day,
    startDate: null,
    endDate: null,
    off: false, // 用来判断是否已经选了结束时间
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
