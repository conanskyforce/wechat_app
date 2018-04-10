
// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: "欢迎使用",
    colorSet: "",
    version:"v1.1.0",
    author:"conan",
    array:[
      'JavaScript',
      'Python',
      'Java',
      'PHP',
      'Ruby',
      'C++',
      "C#",
      'Go',
      'Swift',
      'ASP'
    ],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'lang',
      success: function (res) {
        that.setData({
          index: that.data.array.map(function(i){return i.toLowerCase()}).indexOf(res.data)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
    wx.setStorage({
      key: 'lang',
      data: this.data.array[e.detail.value].toLowerCase(),
    })
  },
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