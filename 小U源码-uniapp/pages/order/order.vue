]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list">
			<view class="row" v-for="(item,index) in goodsList" :key="item.id" v-if="goodsList.length>0">
				<view class="products">
					<view class="imagebox">
						<image :src="baseUrl+item.child[0].img" mode="widthFix"></image>
						<text>{{item.child[0].goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text space="nbsp">总计{{item.countnumber}}商品 </text>
					<text>已付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-if="goodsList.length==0">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import {
		baseUrl
	} from '../../utils/config.js'
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				goodsList: [], //提交的商品订单
				baseUrl, //基地址
			}
		},
		methods: {
			async getOrder() {
				var userInfo = uni.getStorageSync('userInfo');
				var res = await this.$http('/api/orders', {
					uid: userInfo.uid
				}, {
					authorization: userInfo.token,
					'content-type': 'application/x-www-form-urlencoded'
				}).catch(err => {
					console.log(err);
					return;
				})
				this.goodsList = res.data.list;
			},
		},
		async onLoad(e) {
			console.log(e.from);
			if (e.from != 'mine') {
				uni.showToast({
					title: '提交成功!',
					duration: 1000
				})
			}
			await this.getOrder();
		}
	}
</script>
<style>
	.row {
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}

	.imagebox {
		float: left;
		margin: 10rpx;
	}

	.products {
		overflow: hidden;
	}

	image {
		width: 160rpx;
		margin-left: 10rpx;
	}

	.info {
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
