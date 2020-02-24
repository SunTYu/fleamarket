import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton,AtToast }  from 'taro-ui'

import TabBar from '../../components/tabBar'
import PublishInfo from './info'
import Category from './category'
import Contact from './contact'
import PublishImages from './images'
import './index.scss'

const requiredTips = {
  title: '标题不能为空',
  price:'价格不能为空',
  detail:'详情不能为空',
  selectedCategory: '分类不能为空',
  selectedContacts: '联系方式不能为空',
}

export default class Publish extends Component {

  state = {
    title: '',
    price:'',
    detail:'',
    showToast: false,
    toastText: '',
    selectedCategory: '',
    selectedContacts: [],
  }

  validRequired = (val,name) => {
    if (!val.length){
      const text = requiredTips[name]
      this.setState({
        showToast: true,
        toastText: text
      })
      return false
    }
    return true
  }

  handleSubmit = () => {
    const {title, price, detail, selectedCategory} = this.state
    if(!this.validRequired(title,'title')){
      return
    }
    if(!this.validRequired(price,'price')){
      return
    }
    if(!this.validRequired(detail,'detail')){
      return
    }
    if(!this.validRequired(selectedCategory,'selectedCategory')){
      return
    }
    if(!this.validRequired(selectedCategory,'selectedContacts')){
      return
    }
  }

  handleClose = () => {
    this.setState({
      showToast: false,
      toastText: ''
    })
  }

  setVal = (key,value) => {
    this.setState({
      [key]:value
    })
  }

  config: Config = {
    navigationBarTitleText: 'publish',
  }

  render () {
    return (
      <View className="publish">
        <PublishInfo onSetVal={this.setVal} />
        <PublishImages  onSetVal={this.setVal} />
        <Category onSetVal={this.setVal} selectedCategory={this.state.selectedCategory} />
        <Contact onSetVal={this.setVal} selectedContacts={this.state.selectedContacts} />
        <View className="form_btn">
          <AtButton type="primary" onClick={this.handleSubmit}>发布</AtButton>
        </View>
        <AtToast isOpened={this.state.showToast} text={this.state.toastText} onClose={this.handleClose} hasMask status="error"></AtToast>
        <TabBar  current={1} />
      </View>
    )
  }
}
