// pages/ucenter/userEdit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    btnValue:true,
    loading: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      user: getApp().globalData.user
    });
  },
  formPost:function(e){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var that=this;
    e.detail.value.openid = that.data.user.openid;
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=update_user',
      data:e.detail.value,
      success:function(res){
        wx.request({
          url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=register',
          data: {
            openid: getApp().globalData.user.openid
          },
          success: function (res3) {
            wx.hideLoading();
            if(res.data)
            that.setData({
              userInfo: res3.data
            })
            getApp().globalData.user = res3.data;
          }
        })

        if(res.data.status==1){
          wx.showToast({
            title: res.data.msg,
            mask: true,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../ucenter/index'
            })
          },2000)
        }else{
          wx.showToast({
            title: res.data.msg,
            mask: true,
            icon: 'none',
            duration: 2000
          })
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