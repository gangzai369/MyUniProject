import {baseUrl} from "./config.js"

function http(url,data={},method="GET"){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+url,
			data:data,
			method:method,
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
// 导出HTTP
export {http}