// pages/goods_detail/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  //商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodDetail(goods_id)
  },

  //获取商品详情数据
  async getGoodDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj.data.message ;
    this.setData({
      goodsObj:{
        pics:goodsObj.data.message.pics,
        goods_name:goodsObj.data.message.goods_name,
        goods_price:goodsObj.data.message.goods_price,
        goods_introduce:goodsObj.data.message.goods_introduce,
      }
    })
  },

  //点击轮播图放大预览
  handlePreviewImage(e){
    //console.log("点击轮播图放大");
    const urls = this.GoodInfo.pics.map(v=>v.pics_mid);
    console.log(e);
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current: current,
      urls: urls,
      
    });
  },

  //点击购物车增加商品
handleCartAdd(e){
  let cart = wx.getStorageSync("cart")||[];
  let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
  if(index===-1){
    this.GoodsInfo.num = 1;
    cart.push(this.GoodsInfo);
  }else{
    cart[index].num++;
  }
  wx.setStorageSync("cart", cart);
  wx.showToast({
    title: '加入成功',
    icon:'success',
    mask:true, //防止用户手抖 防抖
  });
}
})


