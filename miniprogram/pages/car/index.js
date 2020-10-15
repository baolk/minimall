// pages/car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击 收获地址
  handlechooseAddress(){
    wx.getSetting({
      success: (result)=>{
        console.log(result)
        const scopeAddress = result.authSetting["scope.address"]
        if(scopeAddress === true || scopeAddress === undefined){
          wx.chooseAddress({
            success: (result1)=>{
              console.log(result1);
            }
          });
        }else{
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3)=>{
                  console.log(result3)
                }
              });
            }
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }

})