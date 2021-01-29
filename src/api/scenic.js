import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function save(obj) {
  return request({
    url: BASE_URL + 'scenic/save',
    method: 'post',
    data: obj
  })
}
export function getAll(matchStr) {
  return request({
    url: BASE_URL + 'scenic/getAll',
    method: 'GET',
    params: {
      matchStr
    }
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'scenic/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function getById(id) {
  return request({
    url: BASE_URL + 'scenic/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
