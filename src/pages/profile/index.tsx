import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { ComponentClass } from 'react'
import { connect } from '@tarojs/redux'

import TabBar from '../../components/tabBar'
import OperationItem from '../../components/operationItem'
import './index.scss'

type UserInfo = {
  avatarUrl: string,
  id: string,
  nickname: string,
  brief: string,
}

type PageStateProps = {
  userInfo: UserInfo
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Profile {
  props: IProps;
}

@connect(({ userInfo }) => ({
  userInfo: userInfo,
}))

class Profile extends Component {

  componentWillMount () {}

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '个人中心',
  }

  render () {
    return (
      <View className='profile'>
        <View className='profile-header'>
          <Image className="image" src={this.props.userInfo.avatarUrl} />
          <View className='header-right'>
            <Text className='name'>{this.props.userInfo.nickname}</Text>
            <Text className='description'>{this.props.userInfo.brief || '这个人很懒，什么也没有留下~'}</Text>
          </View>
        </View>
        <View className='operation-list'>
          <OperationItem title='我的出售' count={5} icon='iconright'></OperationItem>
          <OperationItem title='我的求购' count={5} icon='iconright'></OperationItem>
        </View>
        <TabBar  current={2} />
      </View>
    )
  }
}

export default Profile as ComponentClass<PageOwnProps, PageState>
