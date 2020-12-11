<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="activeIndex==index?'activeList':''" v-for="(item,index) in cateList" :key="index" @click="toChange(index)">
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom" v-if="cateList.length>0">
					<view class="bottom_list" v-for="(item,index) in cateList[activeIndex].children" :key="index">
						<!-- 每个最多显示6个 -->
						<view >
							<image :src="baseUrl+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {baseUrl} from '../../utils/config.js'
	export default{
		data(){
			return{
				cateList:[],		//保存数据
				activeIndex:0,     //动态值
				baseUrl,           //服务器基地址
			}
		},
		async onLoad(e){
			var res = await this.$http('/api/getcates').catch(err=>{
				console.log(err);return;
			})
			this.cateList=res.data.list;
			this.activeIndex = e.id
		},
		methods:{
			toChange(idx){
				this.activeIndex = idx;
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
