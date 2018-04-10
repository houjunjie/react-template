const APIV1 = '/api/v1'
// const APIV1 = 'http://test.beidousat.com:8084/server/index.php?g=Web&c=Mock&o=simple&projectID=16&uri=/v4.0'
const APIV2 = '/api/v2'

module.exports = {
  openPages: ['/login', '/platform'],
  apiPrefix: APIV1,
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/token/password`,
    indexbanner: `${APIV1}/indexbanner`,
    songlists: `${APIV1}/songlists`,
    userService: `${APIV1}/user/user/:id/service`,
  },
}
