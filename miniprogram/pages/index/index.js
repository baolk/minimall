// pages/goods_list/index.js
import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    //楼层数据
    floorList:[],
  },

  onLoad:function(options){
    this.getswiperList();
    this.getcatesList();
    this.getfloorList();
  },

  //获取轮播图数据
  getswiperList(){
   request({
      url: '/home/swiperdata'
   }).then(res=>{
    this.setData({
      swiperList:res.data.message
   })
  })
},

  //获取导航数据
  getcatesList(){
    request({
      url: '/home/catitems'
      }).then(res=>{
        this.setData({
          catesList:res.data.message
        })
      })
  },

  //获取楼层数据
  getfloorList(){
  request({
     url: '/home/floordata'
   }).then(res=>{
     this.setData({
       floorList:res.data.message
     })
   })
 },
})
