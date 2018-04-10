//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    totolResults: "33",
    res:"",
    totolResults: "",
    resFlag:"",
    requestErr:false,
    searchFlag:false,
    searchBarAlert:false,
    searchValue:"",
    sea:"",
    defaultLang:"javascript",
    detailValue:"",
    pageCount:1,
    throttle:false
  },
  //事件处理函数
  
  onReachBottom:function(e){
    //节流,防止多次请求
    if(this.data.throttle) return;
    wx.showNavigationBarLoading();

    this.setData({
      pageCount: ++this.data.pageCount,
      throttle:!this.data.throttle
    });
    console.log(this.data.pageCount)
    this.requests(this.data.defaultLang, this.data.pageCount);
  },
  navToDetail: function (e) {
    console.log(e.currentTarget.dataset.detail)
    var which = e.currentTarget.dataset.detail
    app.detailValue = which;
    wx.navigateTo({
      url: '../detail/detail?id='+which.id
    })
  },
  inputHandler:function(e){
    this.setData({
      searchFlag:e.detail.value!=""
    })
    console.log(e.detail.value);
    
    this.setData({
      resFlag: this.data.res.items.filter(function (i) {
        return i.name.toLowerCase().indexOf(e.detail.value) != -1;
      })
    })
    console.log(this.data.resFlag);
    
  },
  blurHandler:function(e){
    console.log(e)
  },
  focusHandler:function(e){
    console.log(e)
    this.setData({
      searchBarAlert:false
    })
  },
  backToMain:function(e){
    console.log(e)
    var that = this;
    wx.getStorage({
      key: 'lang',
      success: function (resu) {
        var self = that;
        console.log(that.data.defaultLang == resu.data)
        that.setData({
          defaultLang: resu.data,
          detailValue:resu.data
        })
        console.log(that.data.defaultLang == resu.data)
        wx.showNavigationBarLoading()
        wx.getStorage({
          key: resu.data,
          success: function (resu) {
            self.setData({
              res: resu.data,
              searchValue: ""
            })
            console.log('get storage succeed!')
            wx.hideNavigationBarLoading()
          },
          fail: function (err) {
            console.log('onshow failed try request!')
            that.requests(resu.data)
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    });
    
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading()
    this.requests(this.data.detailValue ? this.data.detailValue : this.data.defaultLang);
    this.setData({
      pageCount:1
    })
    // wx.getStorage({
    //   key: this.data.sea,
    //   success: function(res) {
    //     console.log('refresh res.data')
    //     console.log(res.data)
    //     that.requests(res.data);
    //     wx.hideNavigationBarLoading()
    //   },
    // })
  }
  ,
  confirmHandler:function(e){
    console.log(e.detail.value);
    if(e.detail.value==""){
      this.setData({
        searchBarAlert:true
      })
      return;
    }
    wx.showNavigationBarLoading();
    this.requests(e.detail.value)
    this.setData({
      // searchValue:"",
      // searchFlag:false,
      detailValue: e.detail.value
    })
  },
  requests: function (data,page) {
    var that = this;
    console.log(data)
    var sea = (data || 'JavaScript').toLowerCase();
    var pageUrl = !page?"":('&page='+page);
    console.log(pageUrl)
    wx.request({
      url: 'https://api.github.com/search/repositories?q=language:'+sea+'&sort=stars'+pageUrl,
      success: function (res) {
        that.setData({
          res: res.data,
          sea:sea,
          searchFlag: false,
          throttle: !that.data.throttle
        })
        wx.setStorage({
          key: sea,
          data: res.data,
        })
        console.log('https://api.github.com/search/repositories?q=language:' + sea + '&sort=stars' + pageUrl)
        console.log(res.data)
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      },
      fail:function(res){
        that.setData({
          requestErr:res
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    // 获取默认语言
    wx.getStorage({
      key: 'lang',
      success: function (res) {
        var self = that;
        // 设置默认语言
        that.setData({
          defaultLang:res.data
        })
        // 获取默认语言缓存
        wx.getStorage({
          key: res.data,
          success: function(res) {
            self.setData({
              res:res.data
            })
            console.log('get storage succeed!')
          },
          fail:function(err){
            // 获取失败，重新请求语言
            console.log('failed try request!')
            that.requests(res.data)
          }
        })
      },
      fail:function(err){
        console.log(err)
        that.requests();
      }
    })
  },
  onShow:function(){
    // 每次加载这个页面,检查一遍默认语言
    var that = this;
    
    wx.getStorage({
      key: 'lang',
      success: function (resu) {
        var self = that;
        if(that.data.defaultLang == resu.data) return; 
        // console.log('onshow check lang'+resu.data)
        console.log(that.data.defaultLang == resu.data)
        that.setData({
          defaultLang: resu.data
        })
        console.log(that.data.defaultLang == resu.data)
        wx.showNavigationBarLoading()
        wx.getStorage({
          key: resu.data,
          success: function (resu) {
            self.setData({
              res: resu.data
            })
            console.log('get storage succeed!')
            wx.hideNavigationBarLoading()
          },
          fail: function (err) {
            console.log('onshow failed try request!')
            that.requests(resu.data)
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})
