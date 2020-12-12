<template>
	<view class="container">
		<!-- 顶部头像部分 -->
		<view class="mineTop">
			<view class="mineTop_left">
				<view class="mineTop_left_image"><image src="../../static/mine/timg.jpg" mode=""></image></view>
				<view class="mineTop_left_info" v-if="userInfo.nickname">
					<label for="" style="color: #fff;">{{userInfo.nickname}}</label>
				</view>
				<view class="login" v-else>
					<button size="mini" type="primary" @click="toSend">登录</button>
				</view>
			</view>
			<view class="mineTop_right">
				<view class="mineTop_right_info"><label for="">每日签到</label></view>
			</view>
		</view>

		<!-- 订单状态 -->
		<view class="order_state">
			<view class="order_state_list">
				<image src="/static/mine/quanbudingdan.png" mode=""></image>
				<label class="list_text">全部订单</label>
			</view>
			<view class="order_state_list">
				<image src="/static/mine/daifukuan.png" mode=""></image>
				<label class="list_text">待付款</label>
			</view>
			<view class="order_state_list">
				<image src="/static/mine/dizhiguanli.png" mode=""></image>
				<label class="list_text">待收货</label>
			</view>
		</view>

		<!-- 个人信息 -->
		<view class="person_msg">
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/dizhiguanli.png" alt class="MsgItemLogo" />
					<label>地址管理</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>

			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/zu.png" alt class="MsgItemLogo" />
					<label>我的钱包</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/wodeyouhuiquan.png" alt class="MsgItemLogo" />
					<label>我的优惠券</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/wodeerweima.png" alt class="MsgItemLogo" />
					<label>我的二维码</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/xiaohuoban.png" alt class="MsgItemLogo" />
					<label>我的小伙伴</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入判断登录方法
	import {isLogin} from '../../utils/http.js'
export default {
	data(){
		return{
			userInfo:{},	//保存用户信息
		}
	},
	// 加载判断
	onLoad() {
		isLogin();
		this.getInfo();
	},
	methods:{
		getInfo(){
			var info = wx.getStorageSync('userInfo');
			this.userInfo = info;
			console.log(this.userInfo);
		},
		// 判断未登录进行登录
		toSend(){
			uni.navigateTo({
				url:'/pages/send/send'
			})
		}
	}
};
</script>
<style>
@import url('../../common/css/mine.css');
</style>
