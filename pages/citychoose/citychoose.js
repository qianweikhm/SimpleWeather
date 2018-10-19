let staticData = require("../../data/staticData.js")
let utils = require('../../utils/utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showItems: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSortedAreaObj(staticData.cities)
  },
  choose(e){
    var item = e.currentTarget.dataset.item
    var name = item.name
    var pages = getCurrentPages();
    var prevPage = pages[pages.length-2];
    prevPage.setData({
      cityChanged:true,
      searchCity:name
    })
    
    wx.navigateBack({})
  },
  getSortedAreaObj(areas){
    areas = areas.sort((a,b)=>{
      if(a.letter > b.letter){
        return 1
      }
      if(a.letter < b.letter){
        return -1
      }

      return 0
    })
    
    // console.log(areas)
    /* 将数组转化为对象 */
    let obj = {}
    for (let i = 0, len = areas.length; i < len; i++) {
      let item = areas[i]
      let letter = item.letter


      /* 还是转化为数组了 */
      if (!obj[letter]) {
        obj[letter] = []
      }
      
      obj[letter].push(item)
    }
    // console.log(Array.isArr  ay(obj))
    this.setData({
      showItems: obj
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