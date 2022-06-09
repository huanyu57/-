import {
  HTTP
} from '../utils/http.js'

class ClassicModel extends HTTP {
  /*获得最新期刊 */
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        //这里需要使用回调函数(必须)
        sCallback(res)
        this._setLatestIndex(res.index)

        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  _getKey(index) {
    const key = 'classic-' + index
    return key
  }
  /*获得上一期、下一期期刊*/
  getClassic(index, nextOrPrevious, sCallback) {
    //从缓存中取得数据 然后再存入缓存
    let key = nextOrPrevious == 'next' ?
      this._getKey(index + 1) : this._getKey(index - 1)

    let classic = wx.getStorageSync(key)

    //key 确定可KEY
    if (!classic) {
      this.request({
        //url es6 语法eq url:`calssic/${index}/${nextOrPrevious}`
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          sCallback(res)

          wx.setStorageSync(
            this._getKey(res.index), res)
        }
      })

    } else {
      sCallback(classic)
    }

  }
  /*是否为第一期*/
  isFirst(index) {
    return index == 1 ? true : false
  }
  /*是否为最后一期*/
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }
  /*设置最后一期*/
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  /*得到最后一期*/
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }
  getMyFavor(success) {
    let params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }

  getById(cid, type, success) {
    let params = {
      url: 'classic/' + type + '/' + cid,
      success: success
    }
    this.request(params)
  }
}
export {
  ClassicModel
}