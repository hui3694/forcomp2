// pages/pro/pro_list.js
var page = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: 0,
    list:[],
    btmMsg: '下拉加载更多...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      category: options.id
    })
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_pro_list',
      data:{
        category: options.id
      },
      success:function(res){
        res.data.forEach((item) => {
          item.cont = item.cont.substring(0, 55) + '...'
        })
        
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
    var that = this;
    page = page + 1;
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_pro_list',
      data: {
        page: page,
        category: that.data.category
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          btmMsg: '正在加载...'
        });
        if (res.data.status == 0) {
          that.setData({
            btmMsg: res.data.msg
          });
        } else {

          for (var i = 0; i < res.data.length; i++) {
            that.data.list.push(res.data[i]);
          }
          that.setData({
            list: that.data.list
          });
          that.setData({
            btmMsg: '下拉加载更多'
          });
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})