// pages/car/index.js
import {getSetting,chooseAddress,openSetting,showModal, showToast} from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    cart:[],
    totalPrice:0,
    totalNum:0
  },

  onShow(){
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart")||[]; //保证类型的正确性
    cart = cart.filter(v=>v.checked);
    this.setData({address})
    
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v=>{
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
    })
    this.setData({
      cart,
      totalNum,
      totalPrice,
    })
  },

  //点击支付
  handleOrderPay(){
    //判断缓存中有没有token
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    console.log("123");
  }



})