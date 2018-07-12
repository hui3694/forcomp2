// pages/ucenter/point.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    list:null,
    msgShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that=this;
    that.setData({
      userInfo: getApp().globalData.user
    })
    wx.request({
      url: 'http://localhost:40620/tools/app_ajax.ashx?action=register',
      data:{
        openid: that.data.userInfo.openid
      },
      success:function(res){
        that.setData({
          userInfo: res.data
        })
        getApp().globalData.user = res.data;
        //----------------------------------
        wx.request({
          url: 'http://localhost:40620/tools/app_ajax.ashx?action=get_point_list',
          data: {
            uid: getApp().globalData.user.id
          },
          success: function (res) {
            wx.hideLoading();
            that.setData({
              list: res.data
            })
          }
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
  showMsg:function(){
    this.setData({
      msgShow:true
    })
  },
  hideMsg:function(){
    this.setData({
      msgShow: false
    })
  }
})