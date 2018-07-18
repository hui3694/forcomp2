// pages/ucenter/pm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '',
    year: '',
    yearNow:'',
    isEnabled:0,
    msg:''
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
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=pm_exis',
      data:{
        uid: getApp().globalData.user == undefined ? 0 : getApp().globalData.user.id
      },
      success(res){
        wx.hideLoading();

        if(res.data.status==2){
          wx.showToast({
            title: res.data.msg,
            mask: true,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../pro/pro_add'
            })
          }, 2000)
        }
        else if(res.data.status==1){
          that.setData({
            isEnabled:1,
            msg:res.data.msg
          })
        }
      }
    })


    var that=this;
    var date=new Date();
    that.setData({
      //birthday: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      birthday:'1990-01-01',
      year: date.getFullYear(),
      yearNow: date.getFullYear()
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
  bindBirthday:function(e){
    this.setData({
      birthday: e.detail.value
    })
  },
  bindYear:function(e){
    this.setData({
      year: e.detail.value
    })
  },
  formPost:function(e){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    
    var that=this;
    e.detail.value.uid = getApp().globalData.user.id;
    e.detail.value.jobImg = that.data.jobImg;
    e.detail.value.img = that.data.img;
    console.log(e.detail.value);
    wx.request({
      url: 'https://fg.huiguoguo.com/tools/app_ajax.ashx?action=register_pm',
      data: e.detail.value,
      success:function(res){
        wx.hideLoading();

        wx.showToast({
          title: res.data.msg,
          mask: true,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../ucenter/index'
          })
        }, 2000)
      }
    })
  },
  chooseImage: function (e) {
    var self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        var imageSrc = res.tempFilePaths[0]
        console.log(imageSrc);
        wx.uploadFile({
          url: "https://fg.huiguoguo.com/tools/upload_ajax.ashx?action=UpLoadFile&type=0",
          filePath: imageSrc,
          name: 'Filedata',
          success: function (res) {
            console.log('uploadImage success, res is:', res)

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc,
              jobImg: JSON.parse(res.data).path
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })

      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  chooseImage2: function (e) {
    var self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        var imageSrc2 = res.tempFilePaths[0]
        wx.uploadFile({
          url: "https://fg.huiguoguo.com/tools/upload_ajax.ashx?action=UpLoadFile&type=0",
          filePath: imageSrc2,
          name: 'Filedata',
          success: function (res) {
            console.log('uploadImage success, res is:', res)

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc2,
              img: JSON.parse(res.data).path
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })

      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  }
})