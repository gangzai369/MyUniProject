<template>
	<view>
		<button type="primary"  @click="handlePost">发送请求</button>
		<button type="warn" @click="toLogin">登录</button>
	</view>
</template>

<script>
	import {http} from '@/utils/http.js'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 注册
			async handlePost(){
				var res =await this.$http('/api/register',{
					phone:'15237227837',
					nickname:'港仔',
					password:123
				},"POST").catch(err=>{
					console.log(err);return;
				})
				console.log(res);
			},
			// 登录
			async toLogin(){
				var res = await this.$http('/api/login',{
					phone:'15237227837',
					password:123
				},"POST").catch(err=>{
					console.log(err);return;
				})
				console.log(res);
			}
		}
	}
</script>

<style>

</style>
