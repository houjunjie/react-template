import request from 'utils/request';
import config from '../config/index'
import { getLocalStorage } from 'utils'

const { api } = config
const { getCityList, songlists, advertisers, stores, getStoreList, getDatePlan, getAdTypeList } = api

export function queryCity (data) {
  return request({
    url: getCityList,
    method: 'get',
    data,
  })
}

export function querySonglist (data) {
  return request({
    url: songlists,
    method: 'get',
    data,
  })
}

export function queryAdvertisers (data) {
  return request({
    url: advertisers,
    method: 'get',
    data,
  })
}
export function queryStores (data) {
  return request({
    url: stores,
    method: 'get',
    data,
  })
}
export function addStore (data) {
  const uid = getLocalStorage('user_id')
  return request({
    url: getStoreList.replace(':uid', uid),
    method: 'post',
    data,
  })
}
export function queryStoreList (data, method) {
  const uid = getLocalStorage('user_id')
  return request({
    url: getStoreList.replace(':uid', uid),
    ...method,
    data,
  })
}
export function datePlan (data) {
  return request({
    url: getDatePlan,
    method: 'get',
    data,
  })
}
export function adTypeList (data) {
  return request({
    url: getAdTypeList,
    method: 'get',
    data,
  })
}
