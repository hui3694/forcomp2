// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    column:[

    ],
    commend:[
      {
        url: '',
        img: 'http://forcomp.huiguoguo.com/img1.jpg'
      }, {
        url: '',
        img: 'http://forcomp.huiguoguo.com/img1.jpg'
      }, {
        url: '',
        img: 'http://forcomp.huiguoguo.com/img1.jpg'
      }
    ],
    people:[
      {
        url: '',
        img: 'http://forcomp.huiguoguo.com/people1.jpg'
      }, {
        url: '',
        img: 'http://forcomp.huiguoguo.com/people2.jpg'
      }, {
        url: '',
        img: 'http://forcomp.huiguoguo.com/people3.jpg'
      }, {
        url: '',
        img: 'http://forcomp.huiguoguo.com/people4.jpg'
      }
    ],
    news:[
     
    ]

  },
  /*moreShow*/
  moreShow:function(e){
    var that=this;
    var index = e.currentTarget.dataset.index;
    for(var i in this.data.news){
      that.data.news[i].moreShow=0;
    }

    this.data.news[index].moreShow = this.data.news[index].moreShow == 0 ? 1 : 0;
    this.setData({
      news:this.data.news
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
      }
    })

    this.fun();

    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=DyRqXPh8x25Od6N5XEiqSeuTgyts9nGu&location=31.11325,121.38206&output=json',
      success:function(res){
          
        console.log(res);
      }
    })
    //load
    var that = this;
    //pro
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_category_list',
      data: {},
      success: function (res) {
        that.setData({
          column: res.data
        })
      }
    })
    //news
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_news_list',
      data: {},
      success: function (res) {
        res.data.forEach((item) => {
          item.desc = item.zhaiyao.substring(0, 50)+'...';
          item.moreShow = 0;
        })

        that.setData({
          news: res.data
        })
      }
    })
  },
  goCategory:function(){
    wx.switchTab({
      url: '../pro/category' 
    })
  },
  fun:function(){
    var la1 = 31.151617;
    var lo1 = 121.33128;

    var la2 = 31.254959;
    var lo2 = 121.395008;
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;//地球半径
    s = Math.round(s * 10000) / 10000;

    console.log(s);
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