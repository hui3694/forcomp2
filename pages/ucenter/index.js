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

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('该用户已完成授权')
              console.log(res)
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }else{
          that.setData({
            isLogin: 0
          })
          console.log('该用户未完成授权')
        }
      }
    })
  },
  //授权回调
  bindGetUserInfo: function (e) {
    var that=this

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                isLogin: 1
              })
              console.log('授权成功')
              console.log(e.detail.userInfo)
              that.setData({
                userInfo: res.userInfo
              })

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
                            parent_id: 0,
                            gender: res.userInfo.gender,
                            country: res.userInfo.country,
                            province: res.userInfo.province,
                            city: res.userInfo.city
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
        };
      }
    });
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