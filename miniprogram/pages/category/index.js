import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList:[],
    currentIndex:0,  //左侧菜单点击选中项
    scrollTop:0,
    //右侧商品数据
    rightContent:[],
    //接口返回数据
    cates:[]
  },

  onLoad: function (options) {
    //获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>1000*60*5){
        this.getCates();
      }else{
        this.cates = Cates.data
        let leftMenuList = this.cates.map(v=>v.cat_name);
        let rightContent = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
        })
      }
    }
  },


  //获取数据
  getCates(){
    request({
      url: '/categories'
    }).then(res=>{
      this.cates =res.data.message;
      //将接口数据存入本地存储中
      wx.setStorageSync("cates",{time:Date.now(),data:this.cates})
      let leftMenuList = this.cates.map(v=>v.cat_name);
      let rightContent = this.cates[0].children;
      this.setData({
        leftMenuList,
        rightContent,
      })
    })
  },

  //左侧菜单的点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent = this.cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //切换页面使得页面一直在顶部
      scrollTop:0,
    }) 
  }

  
})