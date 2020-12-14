<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="baseUrl+obj.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{obj.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{obj.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="reduce">-</label>
					<label class="zhi">{{sellNum}}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{obj.specsname}}</label>
					<view class="threed3i1">{{obj.specsattr}}</view>
					<!-- <view class="threed3i2">5g</view> -->
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<view v-html="obj.description"></view>
			<!-- 需要处理图片自适应问题 -->
			<!-- <image src="/static/detail/2.jpg" mode="aspectFill"/> -->
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image :src="baseUrl+obj.img" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCart">加入购物车</button>
			<button class="footbtn2" @click="toPay">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		baseUrl
	} from '../../utils/config.js'
	export default {
		data() {
			return {
				obj: {}, //商品详情
				baseUrl, //基地址
				sellNum: 1, //购买数量
			}
		},
		onLoad(e) {
			this.getDetail(e.id)
		},
		methods: {
			async getDetail(id) {
				var res = await this.$http('/api/getgoodsinfo', {
					id
				}).catch(err => {
					console.log(err);
				})
				this.obj = res.data.list[0]
			},
			// 购买添加
			add() {
				this.sellNum++;
				if (this.sellNum >= 10) {
					this.sellNum = 10;
					wx.showToast({
						title: '此产品限购10件',
						duration: 600,
						icon: 'none'
					})
				}
			},
			// 购买减少
			reduce() {
				if (this.sellNum <= 1) {
					wx.showToast({
						title: '不能再减少了',
						duration: 600,
						icon: 'none'
					})
					return;
				}
				this.sellNum--;
			},
			// 添加到购物车
			async addCart() {
				// 判断用户是否已登录
				var userInfo = uni.getStorageSync('userInfo') || {};
				var token = userInfo.token || ''; //保存token
				if (userInfo.token == undefined) {
					uni.showModal({
						title: '您还未登录',
						content: '是否去登录？',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/send/send'
								})
							}
						}
					})
				}
				// 传到数据库中的data数据
				var shopObj = {
					uid: userInfo.uid,
					goodsid: this.obj.id,
					num: this.sellNum
				}
				uni.showModal({
					title: '添加确认',
					content: "添加此商品" + this.sellNum + "件到购物车吗",
					success: async (res) => {
						if (res.confirm) {
							// 添加到数据库
							var res = await this.$http('/api/cartadd', shopObj, {
								authorization: token,
								'content-type': 'application/x-www-form-urlencoded'
							}).catch(err => {
								console.log(err);
								return;
							})
							if (res.data.code == 200) {
								uni.showToast({
									title: '添加成功!'
								})
							}
						}
					}
				})
			},
			// 去购买
			toPay() {
				// 跳转到订单确认页
				uni.showModal({
					title: '订单确认',
					content: "购买规格为"+(this.obj.specsattr)+"此商品" + this.sellNum + "件吗",
					success: async (res) => {
						if (res.confirm) {
							// 添加到数据库
							var res = await this.$http('/api/cartadd', shopObj, {
								authorization: token,
								'content-type': 'application/x-www-form-urlencoded'
							}).catch(err => {
								console.log(err);
								return;
							})
							if (res.data.code == 200) {
								uni.showToast({
									title: '添加成功!'
								})
							}
						}
					}
				})
			}
		},



		// mounted(){
		// 	var id=this.$mp.query;
		// 	console.log(id)
		// }
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
