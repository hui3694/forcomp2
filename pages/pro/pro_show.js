// pages/pro/pro_show.js
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    model: {},
    comList: [],
    isPost: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (that.data.id == 0) {
      that.setData({
        id: options.id
      })
    }

    var uid = 0;
    if (getApp().globalData.user != null) {
      uid = getApp().globalData.user.id;
    }
    //获取模型
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_pro_model',
      data: {
        id: that.data.id,
        uid: uid
      },
      success: function (res) {
        that.setData({
          model: res.data
        });
        that.viewAdd();
        wx.setNavigationBarTitle({
          title: res.data.title//页面标题为路由参数
        });

      }
    })
    //获取评论列表
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_news_commend',
      data: {
        id: that.data.id
      },
      success: function (res) {
        that.setData({
          comList: res.data
        })
      }
    })
  },
  collect: function () {
    wx.showLoading({
      title: '提交中',
      mask: true
    })

    var that = this;
    if (getApp().globalData.user == undefined) {
      getApp().goLogin();
      return;
    }

    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=news_view',
      data: {
        uid: getApp().globalData.user.id,
        isPN: 1,   //pro
        type: 2,
        id: that.data.model.id
      },
      success: function (res) {
        that.setData({
          'model.isCollect': that.data.model.isCollect == 1 ? 0 : 1
        })
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
      }
    })

  },
  showPost: function () {
    this.setData({
      isPost: 1
    })
  },
  hidePost: function () {
    this.setData({
      isPost: 0
    })
  },
  formSubmit: function (e) {
    console.log(e.detail.value.cont);
    var that = this
    if (getApp().globalData.user == null) {
      getApp().goLogin();
      return;
    }

    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=post_news_commend',
      data: {
        uid: getApp().globalData.user.id,
        name: getApp().globalData.user.nickname,
        avatar: getApp().globalData.user.avatar,
        isPN: 1,
        news_id: that.data.model.id,
        cont: e.detail.value.cont
      },
      success: function (res) {
        if(res.data.status==1){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          that.onPullDownRefresh();
          console.log('success');
        }else{//提交失败
          wx.showModal({
            title: '提交失败',
            content: res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        
      }
    })
  },
  viewAdd: function () {
    var that = this;
    //浏览量+1
    var uid = 0;
    if (getApp().globalData.user != null) {
      uid = getApp().globalData.user.id
    }

    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=news_view',
      data: {
        uid: uid,
        isPN: 1,   //pro
        type: 1,   //view
        id: that.data.model.id
      },
      success: function (res) {
        console.log('浏览量+1');
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
    this.setData({
      isPost:0,
    });
    this.onLoad();
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