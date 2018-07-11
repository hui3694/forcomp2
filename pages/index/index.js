// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    column:[],
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
    news:[],
    cityList:[],
    localCity:'未知',
    cityShow: 0

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
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
    //----------------
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    this.fun();
    
    //load
    var that = this;
    //pro_category
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_category_list',
      data: {},
      success: function (res) {
        that.setData({
          column: res.data
        })
      }
    })
    //pro_city
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_pro_city',
      success:function(res){
        that.setData({
          cityList:res.data
        })

        wx.getLocation({
          type: 'wgs84',
          success: function (res2) {
            //获取指定位置城市
            wx.request({
              url: 'https://api.map.baidu.com/geocoder/v2/?ak=DyRqXPh8x25Od6N5XEiqSeuTgyts9nGu&location=' + res.latitude + ',' + res.longitude + '&output=json',
              success: function (res3) {
                console.log(res3.data.result.addressComponent.city);
                //找到当前城市并选中
                that.data.localCity = res.data[0].city;
                for (var index in res.data) {
                  if (res.data[index].city == res3.data.result.addressComponent.city){
                    that.data.localCity = res.data[index].city;
                  }
                }
                that.setData({
                  localCity: that.data.localCity
                })
                getApp().globalData.localCity = that.data.localCity;
              }
            })
          }
        })
      }
    })
    //news
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_news_list',
      data: {},
      success: function (res) {
        wx.hideLoading();
        
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
  onShareAppMessage: function (e) {
    var that = this;
    if(e.from=='menu'){
      return;
    }
    var id = e.target.dataset.id;
    
    var title = e.target.dataset.title;
    var index = e.target.dataset.index;
    var shareObj = {
      title: title, // 默认是小程序的名称(可以写slogan等)
      path: '/pages/news/news_show?id=' + id,  // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: 'https://fg.huiguoguo.com' + that.data.news[index].img, //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          console.log('成功转发');
          if(res.shareTickets==undefined){
            console.log('转发到好友');
          }else{
            console.log('转发到群');
            getApp().goShare();
          }
        }
      },
      fail: function (res) {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          console.log('取消转发');
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          console.log('转发出错');
          // 转发失败，其中 detail message 为详细失败信息
        }
      },
      complete: function () {
        // 转发结束之后的回调（转发成不成功都会执行）
      }
    };
    return shareObj;
  },
  showCity:function(){
    var that=this;
    if(that.data.cityShow==1){
      that.data.cityShow = 0;
    }else{
      that.data.cityShow = 1;
    }
    that.setData({
      cityShow: that.data.cityShow
    })
  },
  cityClick:function(e){
    var that=this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    that.setData({
      localCity: that.data.cityList[index].city
    });
    getApp().globalData.localCity = that.data.cityList[index].city;
  },
  searchSubmit:function(e){
    wx.navigateTo({
      url: '../pro/pro_list?keywords=' + e.detail.value
    })
  }, //收藏
  collect: function (e) {
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
        isPN: 2,   //news
        type: 2,
        id: e.target.dataset.id
      },
      success: function (res) {
        wx.hideLoading();

        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
      }
    })
  }

})