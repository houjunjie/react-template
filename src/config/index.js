const APIV1 = 'http://test.beidousat.com:8084/server/index.php?g=Web&c=Mock&o=simple&projectID=16&uri=/v4.0'
const APIV2 = '/api/v2'

module.exports = {
  name: '爱唱歌',
  prefix: 'antdAdmin',
  footerText: '爱唱歌后台',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login', '/platform'],
  apiPrefix: APIV1,
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/token/password`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    indexbanner: `${APIV1}/indexbanner`,
    songlists: `${APIV1}/songlists`,
    user: `${APIV1}/user/:id`,
    userService: `${APIV1}/user/user/:id/service`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
