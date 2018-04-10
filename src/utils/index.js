import { cloneDeep } from 'lodash';
import jwt from 'jsrsasign';
import permission from '../config/permission';


// 数组转树
export function arrayToTree(arr) {
  const current = cloneDeep(arr);
  const hash = {};
  const result = [];
  current.forEach(item => hash[item.id] = item);
  current.forEach(item => {
    const parent = hash[item.pid];
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
    } else {
      result.push(item)
    }
  });
  return result;
}

/**
 * 获取指定权限相关信息
 *
 * @export
 * @param {string} key 查询类型
 * @param {string} value 查询值
 * @returns
 */
export function getPermissionInfo(key, value) {
  for (let i = 0; i < permission.length; i += 1) {
    const data = permission[i];
    if (data[key] === value) {
      return data
    }
  }
}

// 通过id获取当前权限的层级
export function getPermissionParent(id) {
  const permission = getPermissionInfo('id', id);
  if (id && permission.type === 0) {
    const current = id.split('.');
    const tmp = [];
    const arr = [];
    for (let i = 0; i < current.length; i += 1) {
      tmp.push(current[i]);
      arr.push(tmp.join('.'));
    }
    return arr;
  } else {
    return [id];
  }
}


const jws = new jwt.KJUR.jws.JWS()
const tokenVerfy = function (token) {
  jws.parseJWS(token)
  return jws.parsedJWS.payloadS
}

/**
 * 设置local
 * @param {[type]} key   [键名]
 * @param {[type]} value [键值]
 * @param {[type]} 过期时间 秒
 */
const setLocalStorage = function (key, value, time) {
  const exp = time || null
  exp ? window.localStorage.setItem(key, JSON.stringify({ data: value, exp })) :
    window.localStorage.setItem(key, JSON.stringify({ data: value, exp }))
}
const getLocalStorage = function (key) {
  let data = window.localStorage.getItem(key)
  let dataObj = JSON.parse(data)
  if (dataObj.exp && new Date().getTime() > dataObj.exp * 1000) {
    console.log('信息已过期')
    window.localStorage.removeItem(key)
    // alert("信息已过期")
    return false
  }
  // console.log("data="+dataObj.data);
  // console.log(JSON.parse(dataObj.data));
  let dataObjDatatoJson = JSON.parse(dataObj.data)
  return dataObjDatatoJson
}


export {
  tokenVerfy,
  setLocalStorage,
  getLocalStorage,
}
