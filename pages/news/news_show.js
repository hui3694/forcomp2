// pages/news/news_show.js
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    
    wx.request({
      url: 'http://localhost:40620/tools/app_ajax.ashx?action=get_news_model&id=15',
      data:{
        id: options.id
      },
      success:function(res){
        var cont = res.data.cont.replace(/\/upload/g, "https://fg.huiguoguo.com/upload");
        WxParse.wxParse('article', 'html', cont, that, 20)
        that.setData({
          model:res.data
        })

        wx.setNavigationBarTitle({
          title: res.data.title//页面标题为路由参数
        })
        
        console.log(parseInt(res.data.time));

        //console.log()
        

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