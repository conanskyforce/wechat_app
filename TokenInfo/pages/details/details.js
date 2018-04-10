// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: "" ,
    webs: [
        {
          name: "OKCoin",
          site: "https://www.okcoin.cn"
        },
        {
          name: "Btc-e",
          site: "https://www.btc-e.com"
        },
        {
          name: "Huobi",
          site: "https://www.huobi.com"
        },
        {
          name: "Bter",
          site: "https://www.bter.com"
        },
        {
          name: "CoinBase",
          site: "https://www.coinbase.com"
        },
        {
          name: "BTCChina",
          site: "https://www.btcchina.com"
        },
        {
          name: "btctrade",
          site: "https://www.btctrade.com"
        },
        {
          name: "Bt38",
          site: "https://www.Bt38.com"
        },
        {
          name: "Bithumb",
          site: "https://www.Bithumb.com"
        },
        {
          name: "Bitfinex",
          site: "https://www.Bitfinex.com"
        }
      ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var itemId = options.id;
      var that = this;
      wx.getStorage({
        key: 'result',
        success: function (res) {
          console.log('get storage succeed!')
          var item = res.data.filter(function (i) {
            return i.id == itemId;
          })
          console.log(item[0])
          that.setData({
            res: item[0],
          })
        },
        fail: function () {
          //  that.getRequests();
          console.log('get options failed!')
        }
      })
      wx.showNavigationBarLoading();
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
      wx.hideNavigationBarLoading();
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