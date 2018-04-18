import request from 'utils/request';
import config from '../config/index'

const { api } = config
const { getCityList, songlists, advertisers } = api

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
