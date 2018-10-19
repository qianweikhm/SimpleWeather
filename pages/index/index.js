let utils = require('../../utils/utils')
let globalData = getApp().globalData
const key = globalData.key
let SYSTEMINFO = globalData.systeminfo
Page({
  data: {

    message: '无意义无意义无意义无意义无意义',
    cityDatas: {},
    weatherIconUrl: globalData.weatherIconUrl,

    // 用来清空 input
    searchText: '',
    detailsDic: {
      key: ['tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'vis', 'pres', 'cloud', ''],
      val: {
        tmp: '温度(℃)',
        fl: '体感温度(℃)',
        hum: '相对湿度(%)',
        pcpn: '降水量(mm)',
        wind_dir: '风向',
        wind_deg: '风向角度(deg)',
        wind_sc: '风力(级)',
        wind_spd: '风速(mk/h)',
        vis: '能见度(km)',
        pres: '气压(mb)',
        cloud: '云量',
      },
    },
    lifestyles: {
      'comf': '舒适度指数',
      'cw': '洗车指数',
      'drsg': '穿衣指数',
      'flu': '感冒指数',
      'sport': '运动指数',
      'trav': '旅游指数',
      'uv': '紫外线指数',
      'air': '空气污染扩散条件指数',
      'ac': '空调开启指数',
      'ag': '过敏指数',
      'gl': '太阳镜指数',
      'mu': '化妆指数',
      'airc': '晾晒指数',
      'ptfc': '交通指数',
      'fsh': '钓鱼指数',
      'spi': '防晒指数',
    },
    searchCity: '',
    setting: {},
    bcgImgList: [
      {
        src: '/img/beach-bird-birds-235787.jpg',
        topColor: '#072428'
      },
      {
        src: '/img/clouds-forest-idyllic-417102.jpg',
        topColor: '#0085e5'
      },
      {
        src: '/img/backlit-dawn-dusk-327466.jpg',
        topColor: '#fefefe'
      },
      {
        src: '/img/accomplishment-adventure-clear-sky-585825.jpg',
        topColor: '#1a1a18'
      },
      {
        src: '/img/fog-himalayas-landscape-38326.jpg',
        topColor: '#b8bab9'
      },
      {
        src: '/img/asphalt-blue-sky-clouds-490411.jpg',
        topColor: '#607384'
      },
      {
        src: '/img/aerial-climate-cold-296559.jpg',
        topColor: '#b0c8e2'
      },
      {
        src: '/img/beautiful-cold-dawn-547115.jpg',
        topColor: '#456e6a'
      }
    ],
    bcgImgIndex: 0,
    index: 0,
    bcgImg: '',
    bcgImgAreaShow: false,
    bcgColor: '#2d2225',

    enableSearch: true,

    openSettingButtonShow: false,

    hasPoped: false,

    animationMain: {},
    animationOne: {},
    animationTwo: {},
    animationThree: {}


  },


  onShow() {

    this.setBcgImg()
    this.setNavigationBarColor('#2d2225')
    this.showSearchCities()
  },
  menuOne() {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/citychoose/citychoose',
    })
  },
  menuTwo() {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  menuThree() {
    this.menuMain()
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  menuMain() {
    if (!this.data.hasPoped) {
      this.popp();
      this.setData({
        hasPoped: true
      })
    } else {
      this.takeback();
      this.setData({
        hasPoped: false
      })
    }
  },

  popp() {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(180).step();
    this.setData({
      animationMain: animationMain.export()
    })

    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationOne.translate(-50, -60).rotateZ(360).opacity(1).step()
    this.setData({
      animationOne: animationOne.export()
    })

    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationTwo.translate(-90, 0).rotateZ(360).opacity(1).step()
    this.setData({
      animationTwo: animationTwo.export()
    })

    let animationThree = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationThree.translate(-50, 60).rotateZ(360).opacity(1).step()
    this.setData({
      animationThree: animationThree.export()
    })
  },
  takeback() {
    let animationMain = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationMain.rotateZ(0).step();
    this.setData({
      animationMain: animationMain.export()
    })


    let animationOne = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationOne.translate(0, 0).rotateZ(360).opacity(0).step()
    this.setData({
      animationOne: animationOne.export()
    })


    let animationTwo = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationTwo.translate(0, 0).rotateZ(360).opacity(0).step()
    this.setData({
      animationTwo: animationTwo.export()
    })

    let animationThree = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationThree.translate(0, 0).rotateZ(360).opacity(0).step()
    this.setData({
      animationThree: animationThree.export()
    })


  },





  showSearchCities() {
    if (!this.data.cityChanged) {
      this.init({})
    } else {
      this.search(this.data.searchCity)
      this.setData({
        cityChanged: false,
        searchCity: '',
      })
    }
  },


  onHide() {
    wx.setStorage({
      key: 'pos',
      data: this.data.pos,
    })
  },



  success(data) {
    let now = new Date();
    data.updateTime = now.getTime();
    data.updateTimeFormat = utils.formatDate(now, "MM-dd hh:mm")
    wx.setStorage({
      key: 'cityDatas',
      data,
    })
    this.setData({
      cityDatas: data,
    })
  },

  commitSearch(res) {
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
    this.search(val)
  },

  clearInput() {
    this.setData({
      searchText: '',
    })
  },
  search(val) {
    if (val === '520' || val === '521') {
      this.clearInput()

      return
    }

    if (val) {
      this.getWeather(val)
    }
  },

  getWeather(location) {
    wx.request({
      url: `${globalData.requestUrl.weather}`,
      data: {
        location: location,
        key,
      },
      success: (res) => {

        // console.log(res)
        if (res.statusCode === 200) {
          let data = res.data.HeWeather6[0]
          if (data.status === 'ok') {
            this.clearInput()
            this.success(data)
          } else {
            wx.showToast({
              title: '查询失败',
              icon: 'none',
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: 'fail',
          icon: 'none',
        })
      },
    })
  },


  setBcgImg(index) {
    if (index !== undefined) {
      this.setData({
        bcgImgIndex: index,
        bcgImg: this.data.bcgImgList[index].src,
        bcgColor: this.data.bcgImgList[index].topColor,
      })
      this.setNavigationBarColor()
      return
    }
    wx.getStorage({
      key: 'bcgImgIndex',
      success: (res) => {
        let bcgImgIndex = res.data || 0
        this.setData({
          bcgImgIndex,
          bcgImg: this.data.bcgImgList[bcgImgIndex].src,
          bcgColor: this.data.bcgImgList[bcgImgIndex].topColor,
        })
        this.setNavigationBarColor()
      },
      fail: () => {
        this.setData({
          bcgImgIndex: 0,
          bcgImg: this.data.bcgImgList[0].src,
          bcgColor: this.data.bcgImgList[0].topColor,
        })
        this.setNavigationBarColor()
      },
    })
  },
  setNavigationBarColor(color) {
    let bcgColor = color || this.data.bcgColor
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.bcgColor,
    })
  },
  init(params) {
    /* 从 */
    //  console.log(this.data.cityDatas)
    wx.getLocation({
      success: (res) => {
        this.loadCity(res.latitude, res.longitude)
      },
      fail: (res) => {

      }
    })
  },
  loadCity: function (latitude, longitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=Kv9suE569fBRpw5wUMMLKb14W2mvlrm3&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success 
        page.getWeather(res.data.result.addressComponent.city)
      },
      fail: function () {
      },

    })
  },


  showBcgImgArea() {
    this.setData({
      bcgImgAreaShow: true,
    })
  },
  hideBcgImgArea() {
    this.setData({
      bcgImgAreaShow: false,
    })
  },
  chooseBcg(e) {
    let dataset = e.currentTarget.dataset
    let src = dataset.src
    let index = dataset.index
    this.setBcgImg(index)
    wx.setStorage({
      key: 'bcgImgIndex',
      data: index,
    })
  },

})