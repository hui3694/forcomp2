// pages/pro/pm_assess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:0,
    id: 0,
    model:null,
    msg:'联系产品经理后，请在下方给他打分',
    isAssess:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that=this
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_pm_model',
      data: {
        id:options.id
      },
      success:function(res){
        that.setData({
          model: res.data
        });
        wx.request({
          url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=is_assess',
          data: {
            pm_id: options.id,
            uid: getApp().globalData.user.id
          },
          success: function (res2) {
            wx.hideLoading();
            if(res2.data.status==0){
              that.setData({
                msg: res2.data.msg,
                val: parseInt(res2.data.val),
                isAssess: true
              })
            }
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
  start_click:function(e){
    this.setData({
      val: e.currentTarget.dataset.val
    })
  },
  postForm:function(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=pm_assess',
      data:{
        uid: getApp().globalData.user.id,
        pm_id: that.data.id,
        val: that.data.val
      },
      success:function(res){
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000,
          mask: true
        });
        setTimeout(function(){
          wx.switchTab({ url: '../index/index' })
        },2000)
      }
    })
  },
  call_click:function(e){
    var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel //仅为示例，并非真实的电话号码
    })
  }
})