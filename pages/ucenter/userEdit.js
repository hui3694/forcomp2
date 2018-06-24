// pages/ucenter/userEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      user: getApp().globalData.user
    })
    
  },
  formPost:function(e){
    var that=this
    console.log(11);
    console.log(e.detail.value)
    e.detail.value.openid=that.data.user.openid
    //e.detail.value
    //http://localhost:40620/tools/app_ajax.ashx?action=get_news_model
    wx.request({
      url: 'http://fg.huiguoguo.com/tools/app_ajax.ashx?action=update_user',
      data:e.detail.value,
      success:function(res){
        if(res.data.status==1){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000,
            success:function(){
              wx.switchTab({
                url: '../ucenter/index'
              })
            }
          })
        }else{

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})