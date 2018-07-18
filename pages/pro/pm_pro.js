// pages/pro/pm_pro.js
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
    var that=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_pm_proList',
      data:{
        uid: getApp().globalData.user.id
      },
      success:function(res){
        wx.hideLoading();
        that.setData({
          list:res.data
        })
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
  
  },
  delPro:function(e){
    var that=this;
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=pm_del_pro',
      data:{
        id:e.target.dataset.id
      },
      success:function(res){
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000,
          mask: true,
          complete: function () {
            setTimeout(function () {
              that.onLoad();
            }, 2000)
          }
        })
      }
    })
  },
  update:function(e){
    wx.navigateTo({
      url: 'pro_add?id='+e.target.dataset.id
    })
  }
})