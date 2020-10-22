// pages/car/index.js
import {getSetting,chooseAddress,openSetting,showModal, showToast} from "../../utils/asyncWx.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    cart:[],
    allchecked:false,
    totalPrice:0,
    totalNum:0
  },

  onShow(){
    //获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart")||[]; //保证类型的正确性
    //空数组调用数组 返回就是true
    // 总价格 总数量
    this.setData({
      address
    })
    this.setCart(cart);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击 收获地址
  async handlechooseAddress(){
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      if(scopeAddress === false){
        await openSetting();
      }
      const address = await chooseAddress();
      wx.setStorageSync("address", address);   //存入到缓存中
    } catch (error) {
      console.log(error);
    }
  },

  // 商品选中
  handleItemChange(e){
    //获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    // 状态取反
    cart[index].checked=!cart[index].checked;
    //触发改变
    this.setCart(cart);
  },

  //设置购物车状态 同时重新计算底部工具栏数据 全选 总价格 购买的数量
  setCart(cart){
    let totalPrice = 0;
    let totalNum = 0;
    let allchecked = true;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allchecked=false;
      }
    })
    allchecked = cart.length!=0?allchecked:false;
    this.setData({
      cart,
      allchecked,
      totalNum,
      totalPrice,
    })
    wx.setStorageSync("cart", cart);
  },

  // 商品的全选功能
  handleItemAllCheck(){
    let {cart,allchecked} = this.data;
    allchecked=!allchecked;
    cart.forEach(v=>v.checked=allchecked);
    this.setCart(cart);
  },

  //商品数量的编辑功能
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset;
    console.log(operation,id);
    let {cart} = this.data;  //解构赋值
    const index=cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&operation===-1){
      const res = await showModal({content:'您是否要删除？'});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
    cart[index].num+=operation;
    this.setCart(cart);
    }
  },

  //支付功能
  async handlePay(){
    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"})
      return;
    }
    if(totalNum===0){
      await showToast({title:"您还没有选购商品"})
      return 
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }

})