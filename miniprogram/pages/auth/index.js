import {request} from "../../request/index.js"
import {login} from "../../utils/asyncWx.js"

Page({
  async handleGetUserInfo(e){
    //获取用户信息
    const {encryptedData,rawData,iv,signature} = e.detail;
    //获取code值
    const {code} = await login();
    const loginParams = {encryptedData,rawData,iv,signature,code} 
    //发送请求 获取用户的token值
    const {token}  = await request({url:"/users/wxlogin",data:loginParams,method:"post"})
   console.log(token);
  }
})