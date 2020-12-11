<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffffff" class="input_"></uni-search-bar>
		<view class="list">
			<view class="row" >
				<image src="/static/classify/1.jpg" mode="widthFix"></image>
				<view class="info">
					<text>雅诗兰黛</text>	
					<text>原价￥45</text>	
					<text>现价￥23</text>	
					<text>3565评论</text>	
				</view>
			</view>
			
		</view>
		<view class="tishi">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	
</script>

<style>

	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
