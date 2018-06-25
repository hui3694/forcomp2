// pages/news/news_list.js
var page = 1;
var keywords='';
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    newsList:[],
    btmMsg:'下拉加载更多...',
    noMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var that = this;
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_news_list',
      data:{
        page:page
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        wx.hideLoading();

        res.data.forEach((item) => {
          item.desc = item.zhaiyao.substring(0, 50) + '...';
        })
        that.setData({
          newsList:res.data
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.noMore){
      return;
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var that = this;
    page = page + 1;
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_news_list',
      data: {
        page: page,
        keywords: keywords
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        setTimeout(function () { wx.hideLoading();},1000);

        that.setData({
          btmMsg: '正在加载...'
        });
        if(res.data.status==0){
          that.setData({
            btmMsg: res.data.msg,
            noMore: true
          });
        }else{
          
          for (var i = 0; i < res.data.length; i++) {
            that.data.newsList.push(res.data[i]);
          }
          that.setData({
            newsList: that.data.newsList
          });
          that.setData({
            btmMsg: '下拉加载更多'
          });
        }
      }
    })
  },
  search:function(e){
    keywords = e.detail.value
    page = 0;
    var that=this;

    setTimeout(function () {
      that.setData({
        newsList: []
      })
      that.onReachBottom();
    }, 500)
    
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})