import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function allOrder() {
  return request({
    url: BASE_URL + 'order/allOrder',
    method: 'GET'
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'order/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}
