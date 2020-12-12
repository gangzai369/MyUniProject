import {baseUrl} from "./config.js"

function http(url,data={},header={},method="GET"){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+url,
			data:data,
			header:header,
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
// 封装是否登录函数
async function isLogin(){
	// 从后台获取数据
	var info = uni.getStorageSync('userInfo')
	console.log(info);
	var token = info.token;
	// 判断token是否过期调用接口
	var res = await http('/api/checktoken',{},{
		authorization:token,
		'content-type':'application/x-www-form-urlencoded'
	}).catch(err=>{
		console.log(err);return;
	})
	console.log(res);
	console.log(res.statusCode);
	// 根据返回码进行判断token是否过期
	if(res.statusCode!=200){
		uni.showToast({
			title:'登录已过期'
		})
		// 登录过期，后台数据userInfo置为空对象
		uni.setStorageSync('userInfo',{})
		// 过期返回send页,重新登录
		uni.navigateTo({
			url:'/pages/send/send'
		})
	}
}
// 导出HTTP
export {http,isLogin}