<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{userInfo.nickname}}</label>
				<label for="">{{userInfo.phone}}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">花果山水帘洞27号</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">
			<view class="cartsInfo" v-for="(item,index) in goodsList" :key="item.id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="baseUrl+item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:黑色</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.num*item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>



			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{allPrice}}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="toPay">提交订单</button>
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
				userInfo: {}, //后台获取用户信息
				token: '', //保存token
				uid: '', //保存用户唯一标识
				goodsList: [], //商品列表
				baseUrl, //基地址
				allPrice: 0, //订单总数
				allSum: 0, //购买总数
			}
		},
		methods: {
			async getOrder() {
				this.goodsList = uni.getStorageSync('goodsInfo'); //本地获取数据
			},
			// 计算总价总数
			cupAllPrice() {
				var sum = 0;
				this.goodsList.forEach(item => {
					sum = sum + item.num * item.price;
					this.allSum = this.allSum + item.num;
				})
				this.allPrice = sum.toFixed(2);
			},
			// 提交订单
			async toPay() {
				// 支付功能目前没有
				uni.showLoading({
					title: '提交中...'
				})
				// 提交订单
				var userInfo = uni.getStorageSync('userInfo');
				var nowTime = new Date().getTime();
				var params = {
					uid: userInfo.uid,
					username: userInfo.nickname,
					userphone: userInfo.phone,
					address: '北京市朝阳区五方桥101号',
					countmoney: this.allPrice,
					countnumber: this.allSum,
					addtime: nowTime,
					status: 1
				}
				// 获取idstr
				var arr = this.goodsList.map(item => {
					return item.id
				});
				var idstr = arr.join(','); //转为要提交的格式
				// params = JSON.stringify(params); //转为字符串
				var res = await this.$http('/api/orderadd', {
					params,
					idstr
				}, {
					authorization: this.token,
					'content-type': 'application/x-www-form-urlencoded'
				}).catch(err => {
					console.log(err);
					return;
				})
				console.log(res);
				setTimeout(this.toOrder,1200);
			},
			// 跳转order页
			toOrder(){
				uni.reLaunch({
					url: '/pages/order/order'
				})
			}
		},
		async onLoad() {
			var userInfo = uni.getStorageSync('userInfo');

			this.userInfo = userInfo;
			this.token = userInfo.token;
			this.uid = userInfo.uid;

			await this.getOrder();
			await this.cupAllPrice();
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
