import request from 'utils/request';
import config from '../config/index'

const { api } = config
const { getCityList } = api

export function queryCity (data) {
  return request({
    url: 'http://test.beidousat.com:8084/server/index.php?g=Web&c=Mock&o=simple&projectID=15&uri=/v4.0/base/administrative-division',
    method: 'get',
    data,
  })
}
