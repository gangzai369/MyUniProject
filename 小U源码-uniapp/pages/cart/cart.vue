<template>
	<view class="container">
		<view class="top" v-if="cartList!=null">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in cartList" :key="item.id">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.status==1?true:false" @change="isOneCheck(item)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="baseUrl+item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label class="firInfo" for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="reduce(item)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(item)">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel" id="demo2" @click="toDel(item.id)"><label for="">删除</label></view>
			</scroll-view>
		</view>
		<view class="shopbox" v-if="cartList==null">
			<image src="../../static/cart/shopcar.png" mode=""></image>
			<view class="shoptext">购物车空空如也,快去购物吧...</view>
			<button type="warn" size="mini" @click="toIndex">跳到首页</button>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="allCheck" @change="isAllCheck" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{allPrice.toFixed(2)}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="toOrder">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{allSum}}件)</label>
			</view>
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
				cartList: [], //保存购物车列表
				baseUrl, //基地址
				allCheck: true, //所有的都选中
				allSum: 0, //购买商品总数
				allPrice: 0, //购买商品总价
				token: '', //保存token
			}
		},
		async onShow() {
			await this.getCartList();
			// 如果caftList 为空结束程序
			if (this.cartList == null || this.cartList == []) {
				return;
			}
			await this.toCount();
			// setTimeout(this.toCount,20)
		},
		methods: {
			async getCartList() {
				// 判断是否已经登录
				var userInfo = uni.getStorageSync('userInfo') || {};
				this.token = userInfo.token;
				var uid = userInfo.uid || '';
				if (userInfo.token == undefined) {
					uni.showToast({
						title: '请重新登录',
						icon: 'none'
					})
					return;
				}
				var res = await this.$http('/api/cartlist', {
					uid
				}, {
					authorization: this.token,
					'content-type': 'application/x-www-form-urlencoded'
				}).catch(err => {
					console.log(err);
					return;
				})
				this.cartList = res.data.list;
			},
			// 购买添加
			add(item) {
				item.num++;
				if (item.num >= 20) {
					item.num = 20;
					wx.showToast({
						title: '此产品限购10件',
						duration: 600,
						icon: 'none'
					})
				}
				this.upCartList(item) //调用更新函数
			},
			// 购买减少
			reduce(item) {
				if (item.num <= 1) {
					wx.showToast({
						title: '不能再减少了',
						duration: 600,
						icon: 'none'
					})
					return;
				}
				item.num--;
				this.upCartList(item) //调用更新函数
			},
			// 更新购物车列表
			async upCartList(item) {
				var res = await this.$http('/api/cartedit', {
					id: item.id,
					num: item.num,
					checked: item.status
				}, {
					authorization: this.token,
					'content-type': 'application/x-www-form-urlencoded'
				}).catch(err => {
					console.log(err);
					return;
				})
				await this.toCount(); //重新调用计算函数
			},
			// 判断是否全选，单选影响全选
			isOneCheck(item) {
				if (item.status == 1) {
					item.status = 0
				} else {
					item.status = 1
				}
				// 用arr保存每个商品的选中状态
				var arr = this.cartList.map(item => {
					return item.status
				})
				// console.log(arr);
				var checkOne = arr.every(item => {
					return item
				})
				// 是否全选
				if (checkOne) {
					this.allCheck = true
				} else {
					this.allCheck = false
				}
				// 调用函数
				this.toCount()
			},
			// 全选影响单选
			isAllCheck() {
				this.allCheck = !this.allCheck
				if (this.allCheck) {
					if(this.cartList==null||this.cartList==[]){
						return;
					}
					this.cartList.forEach(item => {
						item.status = 1
					})
				} else {
					if(this.cartList==null||this.cartList==[]){
						return;
					}
					this.cartList.forEach(item => {
						item.status = 0
					})
				}
				// 调用函数
				this.toCount()
			},
			// 计算金额和数量
			toCount() {
				var shopSum = 0;
				var shopPrice = 0;
				if(this.cartList==null||this.cartList==''){
					return;
				}
				this.cartList.forEach(item => {
					if (item.status == 1) {
						shopSum = shopSum + item.num;
						shopPrice = shopPrice + item.price * item.num;
					}
				})
				this.allSum = shopSum;
				this.allPrice = shopPrice;
			},
			// 删除操作
			async toDel(id) {
				uni.showModal({
					title: '删除操作提示',
					content: '您确定要删除吗？',
					success: async (res) => {
						if (res.confirm) {
							let res = await this.$http('/api/cartdelete', {
								id
							}, {
								authorization: this.token,
								'content-type': 'application/x-www-form-urlencoded'
							}).catch(err => {
								console.log(err);
								return;
							})
							if (res.data.code == 200) {
								uni.showToast({
									title: '删除成功!'
								})
								// 页面重新渲染
								await this.getCartList();
								await this.toCount() //通过await解决异步问题
							}
						}
					}
				})
			},
			// 跳转到订单页
			async toOrder() {
				let isCheck = this.cartList.some(item=>{
					return item.status==1
				})
				// 未勾选商品提示并终止操作
				if(!isCheck){
					uni.showToast({
						title:'请勾选商品!',
						icon:'none'
					})
					return;
				}
				// 要勾选的商品信息提交到本地缓存
				var arr = this.cartList.filter(item=>{
					if(item.status==1){
						return item;
					}
				})
				console.log(arr);
				// 存储到本地
				uni.setStorageSync('goodsInfo',arr);
				// 跳转到订单页
				uni.navigateTo({
					url: '/pages/confirm/confirm'
				})
			},
			// 跳到首页
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		}
	};
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
