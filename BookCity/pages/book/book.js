// pages/book/book.js
import {BookModel} from '../../models/book.js'
import {random} from '../../utils/util.js'
let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPanel:false,
    books:{},
    more:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList((data)=>{
      this.setData({
        books:data
      })
    })
  },

  onReachBottom: function (event) {
    this.setData({
      more:random(16)
    })
  },

  

  onActivateSearch:function(event){
    this.setData({
      searchPanel:true
    })
  },

  onCancel:function(event){
    this.setData({
      searchPanel:false
    })
  }
})