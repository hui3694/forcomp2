// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    column:[
      {
        title: '银行',
        img: 'http://forcomp.huiguoguo.com/icon1.png'
      }, {
        title: '小贷机构',
        img: 'http://forcomp.huiguoguo.com/icon2.png'
      }, {
        title: '网贷',
        img: 'http://forcomp.huiguoguo.com/icon3.png'
      }, {
        title: '渠道商',
        img: 'http://forcomp.huiguoguo.com/icon4.png'
      },
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
      {
        id: 0,
        title: '上海银行触发稳定股价措施经营向好估值或修复回归',
        img: 'http://forcomp.huiguoguo.com/img2.jpg',
        desc: '22日，上海银行(行情601229,诊股)发布关于触发稳定股价措施的提示性公告显上海...',
        view: '24',
        time: '2018-05-23',
        moreShow: 0
      }, {
        id: 0,
        title: '上海银行触发稳定股价措施经营向好估值或修复回归',
        img: 'http://forcomp.huiguoguo.com/img2.jpg',
        desc: '22日，上海银行(行情601229,诊股)发布关于触发稳定股价措施的提示性公告显上海...',
        view: '24',
        time: '2018-05-23',
        moreShow: 0
      }, {
        id: 0,
        title: '上海银行触发稳定股价措施经营向好估值或修复回归',
        img: 'http://forcomp.huiguoguo.com/img2.jpg',
        desc: '22日，上海银行(行情601229,诊股)发布关于触发稳定股价措施的提示性公告显上海...',
        view: '24',
        time: '2018-05-23',
        moreShow: 0
      }, {
        id: 0,
        title: '上海银行触发稳定股价措施经营向好估值或修复回归',
        img: 'http://forcomp.huiguoguo.com/img2.jpg',
        desc: '22日，上海银行(行情601229,诊股)发布关于触发稳定股价措施的提示性公告显上海...',
        view: '24',
        time: '2018-05-23',
        moreShow: 0
      },
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