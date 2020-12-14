<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input @focus="toGetCode" type="text" v-model="phone" maxlength="11"/>
		</view>
		<view class="row">
			<view class="send">
				<button :disabled="!codeTag" size="mini" class="captcha" @click="getCode">验证码</button>
				<text>{{reTime}}</text>
			</view>
			<input @input="toSend" type="text" v-model="code"  placeholder="- - - -" maxlength="4" :disabled="!inpTag" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button :disabled="!loginTag" type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="toLogin">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				reTime:null,	//剩余时间
				phone:'',	//验证的手机号
				code:null,	//输入的验证码
				reCode:'',	//生成的验证码
				codeTag:false,	//验证码禁用
				loginTag:false,	//登录禁用
				inpTag:false,	//第二个输入框禁用
			}
		},
		methods:{
			// input聚焦显示button
			toGetCode(){
				this.codeTag = true;
			},
			// 验证码聚焦显示登录按钮
			toSend(){
				if(this.code==null||this.code==''){
					this.loginTag = false;	//内容为空，禁用按钮
					return;
				}
				this.loginTag = true;	//放开按钮
			},
			// 获取验证码
			getCode(){
				uni.showLoading({
					title:'正在发送',
					duration:1000
				})
				var timer = setInterval(this.reduceTime,1000)
				this.sendCode(timer)
			},
			// 倒计时函数
			reduceTime(timer){
				this.reTime--;
				if(this.reTime<=0){
					this.reTime=0;
					clearInterval(timer);
				}
			},
			// 给接收到的手机号码发短信
			async sendCode(timer){
				this.codeTag = false;	//点击之后禁用获取验证码按钮
				var tPhone = /^1[34578]\d{9}$/;		//手机号正则校验
				var phone = this.phone.trim()
				if(phone==''){
					uni.showToast({
						title:'手机号不能为空',
						icon:'none'
					})
					clearInterval(timer);
					return;
				}
				if(!tPhone.test(phone)){
					uni.showToast({
						title:'输入手机号有误',
						icon:'none'
					})
					clearInterval(timer);
					return;
				}
				this.reTime = 45;	//倒计时时间
				var res = await this.$http('/api/sms',{phone:this.phone}).catch(err=>{
					console.log(err);return;
				})
				uni.showToast({
					title:'已发送!!!',
				})
				this.codeTag = false;		//禁用code获取
				this.inpTag = true;		//开启input框
				this.reCode = res.data.list.code;	//接收到验证码
				console.log(this.reCode);
			},
			// 点击登录
			async toLogin(){
				if(this.code!=this.reCode){
					uni.showToast({
						title:"验证码输入有误",
						duration:1000,
						icon:'none'
					})
					return;
				}
				// 调用登录接口
				// 登录
				var res = await this.$http('/api/login',{
					phone:this.phone,
					password:123
				},{},"POST").catch(err=>{
					console.log(err);return;
				})
				uni.showToast({
					title:'登录成功!!!',
				})
				// 登录成功token存储到本地
				uni.setStorageSync('userInfo',res.data.list);
				// 登录成功跳转到主页
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	.captcha{
		background: #007cfe;
		color: white;
		padding: 0rpx 20rpx;
		border-radius: 13rpx;
		margin-left: 0rpx;
	}
</style>
