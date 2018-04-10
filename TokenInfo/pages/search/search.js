// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    n: 1,
    seen: true,
    rateSort: false,
    priceSort: false,
    nameSort: false,
    res: "",
    dataStorage: "",
    resSearch:'',
    searchEnd:false,
    colorSet:""
  },
  inputHandle:function(e){
    // var that = this;
    console.log(e);
    this.setData({
      searchFlag:true,
      resSearch:this.data.res.filter(function(i){
        return i.symbol.toLowerCase().indexOf(e.detail.value.toLowerCase())!=-1
      })
    })
  },
  navToDetail:function(event){
    var id = event.currentTarget.dataset.itemid;
    // console.log(event);
    wx.navigateTo({
      url: '/pages/details/details?id='+id,
    })
  }
  ,
  blurHandle:function(){
    var that = this;
    this.setData({
      searchFlag:false
    });
    // wx.getStorage({
    //   key: 'result',
    //   success: function (res) {
    //     console.log('storage succeed!')
    //     that.setData({
    //       res: res.data.slice(0, 200),
    //       result: res.data,
    //       searchFlag: false,
    //     })
    //   },
    //   fail: function () {
    //     this.getRequests();
    //   }
    // })
  },
  searchCoin:function(){

  }
  ,
  bindSearchTap: function () {
    wx.showNavigationBarLoading();
    var that=this;
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      if (that.data.n > 9) {
        that.data.n = 10;
        that.setData({
          searchEnd:true
        })
        return;
      }
      console.log(that.data.n)
      that.setData({
        res: that.data.res.concat(that.data.result.slice(200 * that.data.n, 200 * (that.data.n + 1)))
      })
      that.data.n++;
      wx.hideNavigationBarLoading();
    }, 500)

  },
  sortByRate: function () {
    // console.log(this.data.rateSort)
    var that = this;
    this.setData({
      rateSort: !this.data.rateSort,
      res: this.data.res.sort(function (a, b) {
        return that.data.rateSort ? (b.percent_change_24h - a.percent_change_24h) : (a.percent_change_24h - b.percent_change_24h);
      })
    })

  },
  sortByPrice: function () {
    var that = this;
    this.setData({
      priceSort: !this.data.priceSort,
      res: this.data.res.sort(function (a, b) {
        return that.data.priceSort ? (b.price_usd - a.price_usd) : (a.price_usd - b.price_usd)
      })
    })
  },
  sortByName: function () {
    var that = this;
    this.setData({
      nameSort: !this.data.nameSort,
      res: this.data.res.sort(function (a, b) {
        return that.data.nameSort ? (b.market_cap_usd - a.market_cap_usd) : (a.market_cap_usd - b.market_cap_usd)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'result',
      success: function (res) {
        console.log('storage succeed!')
        that.setData({
          res: res.data.slice(0, 200),
          result: res.data,
        })
      },
      fail: function () {
        that.getRequests();
      }
    })
    this.getRequests();
    setInterval(function(){
      that.getRequests();
    },50000)
  },
  // 上拉刷新,看下有没有必要
  // onReachBottom: function (){
  //   if (this.data.n > 9) {
  //     this.data.n = 10;
  //     return;
  //   }
  //   console.log(this.data.n)
  //   this.setData({
  //     res: this.data.res.concat(this.data.result.slice(200 * this.data.n, 200 * (this.data.n + 1)))
  //   })
  //   this.data.n++;
  // },
  onPullDownRefresh: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://api.coinmarketcap.com/v1/ticker/?limit=1000',
      success: function (res) {
        console.log(res)
        that.setData({
          result: res.data,
          res: res.data.slice(0, 200),
          seen: false,
          n: 1
        })
        console.log("succeed");
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        wx.setStorage({
          key: 'result',
          data: res.data,
        })
        console.log('set storage')
        that.setData({
          dataStorage: 'result'
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //每次请求数据的函数
  getRequests: function () {
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://api.coinmarketcap.com/v1/ticker/?limit=1000',
      success: function (res) {
        console.log(res)
        that.setData({
          result: res.data,
          res: res.data.slice(0, 200),
          seen: false

        })
        wx.setStorage({
          key: 'result',
          data: res.data,
        })
        console.log('set storage')
        that.setData({
          dataStorage: 'result'
        })
        wx.hideNavigationBarLoading();
      }
    })
  },
  // 初始化请求函数，加载完数据loading消失
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'colorSet',
      success: function (res) {
        console.log(res.data)
        that.setData({
          colorSet: res.data
        })
        // console.log(typeof res.data)
      }
    })
    
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
  // onPullDownRefresh: function () {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})