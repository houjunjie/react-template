
// import { tokenVerfy, setLocalStorage } from '../utils'
import modelExtend from 'dva-model-extend'
import common from '../common'
import { queryCity, queryStores, addStore, queryStoreList } from 'services/advertising'

export default modelExtend(common.pageModel, {
  namespace: 'resourceslock',
  state: {
    province: [],
    city: [],
    area: [],
    selectedRowKeys: [],
    province_name: '',
    province_code: '',
    city_name: '',
    city_code: '',
    area_name: '',
    area_code: '',
    popoverVisible: false, // 是否显示店家列表
    selectedVisible:false, // 是否显示已选店家
    selectedStorelist: { // 已选店家列表
      sSelectedRowKeys: [],
      sList: [],
      // sPagination: {
      //   showSizeChanger: true,
      //   showQuickJumper: true,
      //   showTotal: total => `共 ${total} 条数据`,
      //   current: 1,
      //   total: 0,
      //   pageSize: 10,
      // }
    }
    // list: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/advertising') {
          dispatch({ type: 'queryProvinceList', payload:{} })
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
      const data = yield call(queryCity, payload.query)
      if (data.success) {
        const { administrative_division } = data.data
        yield put({
          type: 'updateState',
          payload: {
            city: administrative_division,
            ...payload.provinceObj
          }
        })
      } else {
        throw data
      }
    },
    * queryAreaList ({ payload }, { call, put }) {
      const data = yield call(queryCity, payload.query)
      if (data.success) {
        const { administrative_division } = data.data
        yield put({
          type: 'updateState',
          payload: {
            area: administrative_division,
            ...payload.cityObj
          }
        })
      } else {
        throw data
      }
    },
    * queryStorelist ({ payload }, { call, put }) {
      console.log('payloadpayload', payload)
      const data = yield call(queryStores, payload)
      if (data.success) {
        const { info } = data.data
        // yield put({
        //   type: 'updateState',
        //   payload: {
        //     province: administrative_division
        //   }
        // })
        yield put({
          type: 'querySuccess',
          payload: {
            list: info.data,
            pagination: {
              current: Number(payload.current_page) || 1,
              pageSize: Number(payload.per_page) || 10,
              total: info.total,
            },
          },
        })
      } else {
        throw data
      }
    },
    * querySelectedStorelist ({ payload }, { call, put }) {
      console.log('payloadpayload', payload)
      const data = yield call(queryStoreList, payload, {method: "get"})
      if (data.success) {
        const { targeting } = data.data
        // yield put({
        //   type: 'updateState',
        //   payload: {
        //     province: administrative_division
        //   }
        // })
        console.log('info', targeting)
        yield put({
          type: 'updateSelectStoreState',
          payload: {
            sList: targeting.list,
          },
        })
      } else {
        throw data
      }
    },
    * addSelectStore ({ payload }, { call, put }) {
      const data = yield call(addStore, payload)
      if (data.success) {
        const { info } = data.data
        // yield put({
        //   type: 'updateState',
        //   payload: {
        //     province: administrative_division
        //   }
        // })
        yield put({
          type: 'querySuccess',
          payload: {
            list: info.data,
            pagination: {
              current: Number(payload.current_page) || 1,
              pageSize: Number(payload.per_page) || 10,
              total: info.total,
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
    updateSelectStoreState(state, { payload }) {
      const selectedStorelist = state.selectedStorelist
      console.log('payloadpa22222yload',selectedStorelist,'321321', payload)
      return {
        ...state,
        selectedStorelist: {
          ...selectedStorelist,
          ...payload
        }
      }
    }
  }
})
