//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    user: null,
    localCity: '未知'
  },
  goLogin:function(){
    wx.hideLoading();
    wx.showToast({
      title: '未登录，即将跳转登录',
      icon: 'none',
      mask: true,
      duration: 2000
    })

    setTimeout(function () {
      wx.switchTab({
        url: '../ucenter/index'
      })
    }, 2000)
  },
  isLogin:function(){
    if (getApp().globalData.user == null) {
      getApp().goLogin();
    }
  },
  goShare:function(){
    wx.request({
      url: 'http://localhost:40620/tools/app_ajax.ashx?action=go_share',
      data: {
        uid: getApp().globalData.user == null ? 0 : getApp().globalData.user.id
      }
    })
  }
})