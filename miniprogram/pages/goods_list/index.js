// pages/goods_list/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true,
      },
      {
        id:1,
        value:"销量",
        isActive:false,
      },
      {
        id:2,
        value:"价格",
        isActive:false,
      },
    ],
    goodList:[],
  },
  //接口要的参数
  QueryParams:{
    query:"", //关键字
    cid:"",  
    pagenum:1,
    pagesize:10,
  },

  //总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid =options.cid;
    this.getGoodsList();
  },

  //获取商品列表中的数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams});
    //console.log(res.data.message.goods);
    //获取 总条数
    const total = res.data.message.total;
    //计算 总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    // console.log(this.totalPages);
    this.setData({
      goodList:[...this.data.goodList,...res.data.message.goods]
    })

    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },
  
  //标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  //页面上滑 滚动条触底事件
  onReachBottom(){
    //判断还有没有下一页数据
    if (this.QueryParams.pagenum>=this.totalPages){
      //  console.log("没有下一页");
      wx.showToast({
        title: '没有下一页数据了',
      });
    }else{
      // console.log("有下一页数据")
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    //重置数组
    this.setData({
      goodList:[]
    })
    //重置页码
    this.QueryParams.pagenum = 1;
   
    //发送请求
    this.getGoodsList();
  }
})