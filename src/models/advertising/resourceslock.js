
// import { tokenVerfy, setLocalStorage } from '../utils'
import modelExtend from 'dva-model-extend'
import common from '../common'
import { queryCity, queryStores, addStore, queryStoreList, datePlan, adTypeList } from 'services/advertising'
import { message } from 'antd'

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
    },
    ad_plan: [], // 广告排期日期
    adTypeList: [], // 广告形式
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/advertising') {
          dispatch({ type: 'queryProvinceList', payload: {} })
          dispatch({ type: 'queryDatePlan', payload: {} })
          dispatch({ type: 'queryAdTypeList', payload: {} })
        }
      })
    }
  },
  effects: {
    * queryProvinceList ({ payload }, { call, put }) { // 获取省
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
    * queryCityList ({ payload }, { call, put }) { // 获取市
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
    * queryAreaList ({ payload }, { call, put }) {// 获取区
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
    * queryStorelist ({ payload }, { call, put }) { // 查看店铺列表
      const data = yield call(queryStores, payload)
      if (data.success) {
        const { info } = data.data
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
    * querySelectedStorelist ({ payload }, { call, put }) { // 查看已选店铺列表
      const data = yield call(queryStoreList, payload, {method: "get"})
      if (data.success) {
        const { targeting } = data.data
        yield put({
          type: 'updateState',
          payload: {
            selectedVisible: true,
            popoverVisible: false
          },
        })
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
    * putSelectedStorelist ({ payload }, { call, put }) { // 修改已选店铺
      const data = yield call(queryStoreList, payload, {method: "put"})
      if (data.success) {
        message.success('修改成功');
        yield put({
          type: 'updateState',
          payload: {
            selectedVisible: false
          },
        })
      } else {
        throw data
      }
    },
    * addSelectStore ({ payload }, { call, put }) { // 添加已选列表
      const data = yield call(addStore, payload)
      if (data.success) {
        message.success('添加成功');
        yield put({
          type: 'updateState',
          payload: {
            popoverVisible: false
          },
        })
      } else {
        throw data
      }
    },
    * queryDatePlan ({ payload }, { call, put }) { // 广告排期日期
      const data = yield call(datePlan, payload)
      if (data.success) {
        const { ad_plan } = data.data
        yield put({
          type: 'updateState',
          payload: {
            ad_plan: ad_plan
          }
        })
      } else {
        throw data
      }
    },
    * queryAdTypeList ({ payload }, { call, put }) { // 广告排期日期
      const data = yield call(adTypeList, payload)
      if (data.success) {
        const { type } = data.data
        yield put({
          type: 'updateState',
          payload: {
            adTypeList: type.data
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
    updateSelectStoreState(state, { payload }) {
      const selectedStorelist = state.selectedStorelist
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
