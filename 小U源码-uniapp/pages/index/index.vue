<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
		  <view class="logoView">
			<!-- logo -->
			<view class="logo">
				小U商城
			</view>
		  </view>
		  <view class="inputView">
			<input class="textinput" style="center" type="text"   placeholder="寻找商品"/>
		  </view>
		</view>
		
		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
		    <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<text style="display: inline-block;margin-right: 20rpx;">推荐</text>
		        <view class="uni-tab-item"  data-current="0" v-for="(item,index) in navList" :key="index" @click="toSearch(index,item.id)">
		            <text class="uni-tab-item-title" :class="activeIndex==index?'uni-tab-item-title-active':''">
						{{item.catename}}
					</text>
		        </view>
		    </scroll-view> 
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular="true">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<view class="swiper-item">
						<image :src="baseUrl+item.img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
		  <view class="FunctNavLi">
			<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
			<p>限时抢购</p>
		  </view>
		  <view class="FunctNavLi">
		  			<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
		  			<p>积分商城</p>
		  </view>
		  <view class="FunctNavLi">
		  			<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
		  			<p>联系我们</p>
		  </view>
		  <view class="FunctNavLi" @click="toCate">
		  			<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
		  			<p>限时抢购</p>
		  </view>
		</view>
		
		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
				  <image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
				  <label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
				  <label class="LimitTime">{{hour<10?('0'+hour):hour}}</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">{{min<10?('0'+min):min}}</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">{{sec<10?('0'+sec):sec}}</label>
				  <label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>
			
			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>		
					<!-- <div> -->
					<view class="Cloth">
						<image  src="../../static/index/goods1.jpg" alt="">
					</view>
					
					<!-- </div> -->				
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		  <!-- 轮播图2 -->
		<div class="Swiper2">
		  <image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>
		
		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" :class="dataIndex==0?'active_tag_list':''" @click="changeData(0)">
					<label for="">热门推荐</label>
				</view>
				<view class="tag_list" :class="dataIndex==1?'active_tag_list':''" @click="changeData(1)">
					<label for="">发现好货</label>
				</view>
				<view class="tag_list" :class="dataIndex==2?'active_tag_list':''" @click="changeData(2)">
					<label for="">只看专场</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product" v-if="dataList.length>0">
				<view class="product" v-for="(item,index) in dataList[dataIndex].content" :key="index" @click="toDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="baseUrl+item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
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
				navList:[],
				activeIndex:0,//动态数值
				dataIndex:0,//底部数据动态值
				hour:0,		//小时
				min:0,		//分钟
				sec:0,		//秒数
				baseUrl,		//基地址
				bannerList:[],	//轮播图
				dataList:[],	//底部数据
			}
	  },
	  onLoad() {
	  	this.getNav();
		this.getTimes();//秒杀
		this.getBanner();
		this.getData();//获取底部数据
	  },
	  methods:{
		  async getBanner(){
			  var res = await this.$http('/api/getbanner').catch(err=>{
				  console.log(err);return;
			  })
			  this.bannerList = res.data.list;
		  },
		  // 获取滑动的导航栏
		  async getNav(){
			  var res= await this.$http('/api/getcate').catch(err=>{
			  	console.log(err);
			  })
			  this.navList = res.data.list;
		  },
		  // 获取倒计时
		  async getTimes(){
			var res = await this.$http('/api/getseckill').catch(err=>{
				console.log(err);
			})
			var endTime = res.data.list[0].endtime;
			var timer = setInterval(this.sumTime,1000,endTime)
			if(this.hour==0&&this.min==0&&this.sec==0){
				clearInterval(timer)
			}
		  },
		  // 首页获取底部切换数据
		  async getData(){
			  var res = await this.$http('/api/getindexgoods').catch(err=>{
				  console.log(err);
			  })
			  this.dataList = res.data.list
		  },
		  // 点击切换数据
		  changeData(id){
			  this.dataIndex = id;
		  },
		  sumTime(endTime){
			var nowTime = new Date().getTime();
			var time = Math.floor((endTime - nowTime)/1000);
			this.hour = Math.floor(time/3600);
			this.min = Math.floor(time%3600/60);
			this.sec = time%60;
		  },
		  // 携带参数跳转到分类页
		  toSearch(idx){
			 this.activeIndex = idx;
			 uni.navigateTo({
			 	url:"/pages/classify/classify?id="+idx
			 })
		  },
		  // 跳转分类页
		  toCate(){
			  uni.navigateTo({
			  	url:"/pages/classify/classify?id=0"
			  })
		  },
		  // 跳转详情页
		  toDetail(id){
			  uni.navigateTo({
			  	url:"/pages/details/details?id="+id
			  })
		  }
	  }
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
