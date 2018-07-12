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
    city:'',
    id: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    that.setData({
      id: options.id == undefined ? 0 : options.id
    })
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_category_list',
      success:function(res){
        that.setData({
          category:res.data
        })
        console.log(res.data)
        if (that.data.id == 0) {
          wx.hideLoading();
        } else {
          that.getModel();
        }
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
    wx.showLoading({
      title: '提交中',
      mask: true
    })

    var that = this;
    if (!e.detail.value.title) {
      that.showModel('请输入标题');
      return;
    }
    if (!e.detail.value.cont) {
      that.showModel('请输入产品描述');
      return;
    }
    if (that.data.lat == 0 || that.data.lon==0) {
      that.showModel('请重新设置定位');
      return;
    }
    if (!e.detail.value.addr) {
      that.showModel('请输入详细地址');
      return;
    }
    
    //栏目id
    e.detail.value.category = that.data.category[that.data.category1_sel].son[that.data.category2_sel].id;
    e.detail.value.lat = that.data.lat;
    e.detail.value.lon = that.data.lon;
    e.detail.value.city = that.data.city;
    e.detail.value.uid = getApp().globalData.user.id;
    e.detail.value.id = that.data.id;
    console.log(e.detail.value);
    
    wx.request({
      url: 'http://localhost:40620/tools/app_ajax.ashx?action=product_add',
      data: e.detail.value,
      success:function(res){
        wx.hideLoading();

        wx.showToast({
          title: res.data.msg,
          mask: true,
          duration: 2000
        })
        setTimeout(function(){
          wx.switchTab({ url: '../ucenter/index' })
        },2000)
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
  showModel(str){
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 2000
    })
  },
  getModel:function(){
    var that=this;
    
    wx.request({
      url: 'http://localhost:40620/tools/app_ajax.ashx?action=get_pro_model',
      data:{
        id: that.data.id
      },
      success:function(res){
        wx.hideLoading();
        var c1 = 0;
        var c2 = 0;
        for (var i in that.data.category) {
          if(that.data.category[i].id==res.data.category){
            c1 = i;
            for (var j in that.data.category[i].son) {
              if (that.data.category[j].id == res.data.category2) {
                c2 = j;
              }
            }
          }
        }
        that.setData({
          title: res.data.title,
          category1_sel: c1,
          category2_sel: c2,
          cont: res.data.cont,
          lon: res.data.lon,
          lat: res.data.lat,
          addr: res.data.addr
        })
      }
    })
  }
})