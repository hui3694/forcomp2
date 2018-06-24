// pages/pro/pro_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[],
    category1_sel: 0,
    category2_sel: 0,
    lat: 0,
    lon: 0,
    addr: '请输入位置',
    city:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'http://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_category_list',
      success:function(res){
        console.log(res.data);
        that.setData({
          category:res.data
        })
      }
    })
  },
  category_sel1: function (e) {
    this.setData({
      category1_sel: e.detail.value
    })
  },
  category_sel2: function (e) {
    this.setData({
      category2_sel: e.detail.value
    })
  },
  setMap:function(){
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          lat: res.latitude,
          lon: res.longitude,
          addr: res.address
        });

        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=DyRqXPh8x25Od6N5XEiqSeuTgyts9nGu&location=' + res.latitude + ',' + res.longitude + '&output=json',
          success: function (res) {
            console.log(res.data.result.addressComponent.city);
            that.setData({
              city: res.data.result.addressComponent.city
            })
          }
        });
      },
    })
  },
  formPost:function(e){
    var that = this;
    //栏目id
    e.detail.value.category = that.data.category[that.data.category1_sel].son[that.data.category2_sel].id;
    e.detail.value.lat = that.data.lat;
    e.detail.value.lon = that.data.lon;
    e.detail.value.city = that.data.city;
    e.detail.value.openid = getApp().globalData.user.openid;
    console.log(e.detail.value);

    wx.request({
      url: 'http://fg.huiguoguo.com/tools/app_ajax.ashx?action=product_add',
      data: e.detail.value,
      success:function(res){

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