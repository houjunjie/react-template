const APIV1 = '/v4.0'
// const APIV1 = 'http://test.beidousat.com:8084/server/index.php?g=Web&c=Mock&o=simple&projectID=16&uri=/v4.0'
const APIV2 = '/v3.6'

module.exports = {
  openPages: ['/login', '/platform'],
  apiPrefix: APIV1,
  APIV1,
  APIV2,
  storeType: ['量版式', '夜总会', 'minik'],
  api: {
    userLogin: `${APIV1}/user/token/password`,
    indexbanner: `${APIV1}/indexbanner`,
    songlists: `${APIV1}/songlists`,
    userService: `${APIV1}/user/user/:id/service`,
    getCityList: `${APIV1}/base/administrative-division`,
    advertisers: `${APIV1}/advertisers`,
    stores: `${APIV2}/store/store`,
    getStoreList: `${APIV1}/ad/user/:uid/targeting`,
    getDatePlan: `${APIV1}/ad/plan`,
    getAdTypeList: `${APIV1}/ad/type`,
  },
}
