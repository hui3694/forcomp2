// pages/ucenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      pid: options.id == undefined ? 0 : options.id
    })
    if (getApp().globalData.user==undefined){
      console.log('未登录');
      that.bindGetUserInfo(null);
    }else{
      that.setData({
        isLogin:2
      })
    }

  },
  //授权回调
  bindGetUserInfo: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var that=this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                isLogin: 2
              })
              console.log('授权成功')
              //console.log(e.detail.userInfo)
              
              //register
              wx.login({
                success: function (res1) {
                  if (res1.code) {
                    //发起网络请求
                    var appid = 'wx5a3cc438dbc7aa21';
                    var secre = '242517f947a03d75d2be912719e0cfd4';

                    wx.request({
                      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=get_openid', //仅为示例，并非真实的接口地址
                      data: {
                        appid: appid,
                        secre: secre,
                        code: res1.code
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res2) {
                        wx.request({
                          url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=register',
                          data: {
                            avatar: res.userInfo.avatarUrl,
                            nickname: res.userInfo.nickName,
                            openid: res2.data.openid,
                            parent_id: that.data.pid,
                            gender: res.userInfo.gender,
                            country: res.userInfo.country,
                            province: res.userInfo.province,
                            city: res.userInfo.city
                          },
                          success:function(res3){
                            wx.hideLoading();
                            console.log(res3.data);
                            that.setData({
                              userInfo: res3.data
                            })
                            getApp().globalData.user = res3.data;
                          }
                        })
                      }
                    })

                  } else {
                    console.log('登录失败！' + res2.errMsg)
                  }
                }
              });
            }
          })
        }else{
          wx.hideLoading();
          //等待用户触发授权
          that.setData({
            isLogin: 0
          })
        }
      }
    });

    console.log(that.data.userInfo)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      userInfo: getApp().globalData.user
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
    var shareObj = {
      title: getApp().globalData.user.nickname + '邀请您加入阜哥', // 默认是小程序的名称(可以写slogan等)
      path: '/pages/ucenter/index?id=' + getApp().globalData.user.id,  // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: 'http://forcomp.huiguoguo.com/banner1.jpg', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function (res) {
        // 转发成功之后的回调
        if (res.errMsg == 'shareAppMessage:ok') {
          // 转发成功
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
  signIn_click:function(){
    wx.showLoading({
      title: '签到中',
      mask: true
    })

    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=point_log',
      data:{
        type:1,
        uid: getApp().globalData.user.id
      },
      success:function(res){
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })  
      }
    })
  }
})