import axios from 'axios'
import { message } from 'antd'
import { clearAllCookie } from '../utils/utils'

export default (url, data={}, type='GET') => {
	return new Promise ( (resolve, reject) => {
		let promise;
		switch (type) {
			case 'GET': 
				promise = axios.get(url, { params: data }); break;
			case 'POST': 
				promise = axios.post(url, data); break;
			case 'PUT':
				promise = axios.put(url, data); break;
			case 'DELETE':
				promise = axios.delete(url, {params: data}); break;
			default: break;
		}
		
		promise.then( (response) => {
			resolve(response.data)
		}).catch( (error) => {
			reject(error)
		})
	})
} 

axios.interceptors.response.use(response => response, error => {
		const res = error.response
    const { status, data } = res
		switch(status){
			case 401:
				// message.error(data.msg)
        break;
      case 403:
        message.error('登录过期')
        clearAllCookie()
        window.location.reload()
        break;
			default:
				return Promise.reject(data)
		}
		return Promise.reject(data)
	})