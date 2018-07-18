// pages/news/news_show.js
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    model:{},
    comList:[],
    isPost:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var that=this;
    if(that.data.id==0){
      that.setData({
        id: options.id
      })
    }
    
    var uid=0;
    if (getApp().globalData.user!=null){
      uid = getApp().globalData.user.id;
    }
    //获取模型
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_news_model',
      data:{
        id: that.data.id,
        uid: uid
      },
      success:function(res){
        var cont = res.data.cont.replace(/\/upload/g, "https://fg.huiguoguo.com/upload");
        WxParse.wxParse('article', 'html', cont, that, 20);
        
        that.setData({
          model:res.data
        });
        that.viewAdd();
        wx.setNavigationBarTitle({
          title: res.data.title//页面标题为路由参数
        });

        //获取评论列表
        wx.request({
          url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_news_commend',
          data: {
            id: that.data.id
          },
          success: function (res2) {
            wx.hideLoading();
            that.setData({
              comList: res2.data
            })
          }
        })

      }
    })
  },
  collect:function(){
    wx.showLoading({
      title: '提交中',
      mask: true
    })

    var that=this;
    if (getApp().globalData.user == undefined){
      getApp().goLogin();
      return;
    }

    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=news_view',
      data: {
        uid: getApp().globalData.user.id,
        isPN:2,   //news
        type:2,
        id:that.data.model.id
      }, 
      success: function (res) {
        wx.hideLoading();
        that.setData({
          'model.isCollect': that.data.model.isCollect==1?0:1
        })

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
  formSubmit:function(e){
    console.log(e.detail.value.cont);
    var that=this
    if (getApp().globalData.user == null) {
      getApp().goLogin();
      return;
    }

    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=post_news_commend',
      data:{
        uid: getApp().globalData.user.id,
        name: getApp().globalData.user.nickname,
        avatar: getApp().globalData.user.avatar,
        isPN: 2,
        news_id: that.data.model.id,
        cont: e.detail.value.cont
      },
      success:function(res){
        wx.request({
          url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=point_log',
          data:{
            type:2,//评论
            uid: getApp().globalData.user.id,
            isPN: 2,
            nid: that.data.model.id
          }
        });
        that.onPullDownRefresh();
        console.log('success');
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  viewAdd:function(){
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
        isPN: 2,   //news
        type: 1,   //zan
        id: that.data.model.id
      },
      success: function (res) {
        console.log('浏览量+1');
      }
    })
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
    var that = this
    that.setData({
      isPost: 0
    });
    that.onLoad(null);
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