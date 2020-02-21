import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {View, Picker, Text} from '@tarojs/components'

import { fetchCategories } from '../../../actions/category'
import './index.scss'

interface Category {
  id: string,
  name: string,
}

type PageStateProps = {
  category: {
    category: Array<Category>,
  }
}

type PageDispatchProps = {
  fetchCategories: () => Function
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Category {
  props: IProps;
}

@connect(({ category }) => ({
  category
}), (dispatch) => ({
  fetchCategories () {
    dispatch(fetchCategories())
  }
}))
class Category extends Component {

  state = {
    selectedCategory: '',
    selector: ['美国', '中国', '巴西', '日本']
  }

  componentWillMount () {}

  componentDidMount () {
    if (this.props.category.category.length === 0) {
      this.props.fetchCategories()
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onCategoryChange = (e) => {
    this.setState({
      selectedCategory: this.state.selector[e.detail.value]
    })
  }

  render () {
    return (
      <View className='category'>
        <View className='form_line'>
          <View>
            <Text className='form_line_required'>*</Text>
            <Text className='form_line_label'>分类</Text>
          </View>
          <View className='form_line_content'>
            <Picker className='picker' mode='selector' range={this.state.selector} onChange={this.onCategoryChange} value={0}>
              {this.state.selectedCategory ?
                <View>
                  <Text className='category'>{this.state.selectedCategory}</Text>
                  <Text className="icon iconfont">&#xe658;</Text>
                </View> :
                <View>
                  <Text className='category'>选择分类</Text>
                  <Text className="icon iconfont">&#xe658;</Text>
                </View>
              }
            </Picker>
          </View>
        </View>
      </View>
    )
  }
}

export default Category as ComponentClass<PageOwnProps, PageState>