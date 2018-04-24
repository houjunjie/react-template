/**
 * 权限列表
 * @param {number} type 权限类型
 * 0 在侧边栏中展示
 * 1 非侧边栏展示
 */

export default [{
  id: 'users',
  pid: '',
  title: '用户管理',
  icon: 'user',
  route: '/users',
  type: 0,
}, {
  id: 'ad',
  pid: '',
  title: '广告业务',
  icon: 'shop',
  route: '/advertising',
  type: 0,
}];
