// app.js
App({
  onLaunch: function () {
    this.globalData = {};
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null;
    // 获取设备信息
    wx.showLoading({
      title: '加载初始化',
      mask: true
    })
    wx.getSystemInfo({
      success: res => {
        const {
          windowHeight,
          windowWidth,  // 获取屏幕宽度
          statusBarHeight,  // 获取状态栏的高度
          pixelRatio,
        } = res;
        // 根据胶囊的位置计算文字的行高以及距离状态栏文本的位置
        let lineHeight = (rect.top - statusBarHeight) * 2 + rect.height;
        // 根据胶囊的位置计算距离右侧的宽度，用于设置返回按钮至左侧的距离
        let leftDistance = windowWidth - rect.right;
        this.globalData.windowHeight = windowHeight;
        this.globalData.rectHeight = rect.height;
        this.globalData.statusBarHeight = statusBarHeight;
        this.globalData.pixelRatio = pixelRatio;
        this.globalData.lineHeight = lineHeight;
        this.globalData.leftDistance = leftDistance;
        wx.setStorageSync('SystemInfo', {
          windowHeight,
          rectHeight: rect.height,
          statusBarHeight,
          pixelRatio,
          lineHeight,
          leftDistance,
        })
        // console.log(brand);
        wx.hideLoading()
      },
      fail: err => {
        let SystemInfo = wx.getStorageSync('SystemInfo')
        this.globalData.windowHeight = SystemInfo.windowHeight;
        this.globalData.rectHeight = SystemInfo.rectHeight; 
        this.globalData.statusBarHeight = SystemInfo.statusBarHeight;
        this.globalData.pixelRatio = SystemInfo.pixelRatio;
        this.globalData.lineHeight = SystemInfo.lineHeight;
        this.globalData.leftDistance = SystemInfo.leftDistance;
        this.globalData.model = SystemInfo.model;
        console.log(err)
      }
    })
  }
});
