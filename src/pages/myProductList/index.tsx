import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { AtLoadMore, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { ReactNodeLike } from 'prop-types'


import ProductListItem from './components/productListItem'
import Preload from '../../components/center/preload'

import { ProductType, SearchOrderBy, SearchSortDirection, Origin } from '../../constants/enums'
import { Product } from '../../interfaces/product'
import { InMyProductListState } from '../../reducers/myProductList'

import styles from './index.module.scss'
import { fetchMyProductList, resetMyProductListState, fetchMyCollectList } from '../../actions/myProductList'

const TITLES = {
  [ProductType.GOODS]: '出售',
  [ProductType.PURCHASE]: '求购',
}

type PageStateProps = {
  myProductList: InMyProductListState,
}

type PageDispatchProps = {
  fetchMyProductList: (searchInput, productType: ProductType) => Function,
  resetState: () => Function,
  fetchMyCollectList: (searchInput) => Function,
}

type PageOwnProps = {}

type PageState = {
  productType: ProductType,
  origin: Origin
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface MyProductList {
  props: IProps;
}

@connect(({ myProductList }) => ({
  myProductList,
}), (dispatch) => ({
  fetchMyProductList(searchInput, productType) {
    dispatch(fetchMyProductList(searchInput, productType))
  },
  resetState() {
    dispatch(resetMyProductListState())
  },
  fetchMyCollectList(searchInput) {
    dispatch(fetchMyCollectList(searchInput))
  },
}))
class MyProductList extends Component<PageOwnProps, PageState> {
  state = {
    productType: ProductType.GOODS,
    origin: Origin.PUBLISH,
  }

  config: Config = {
    navigationBarTitleText: '',
  }

  componentWillMount(): void {
    const { productType, origin } = this.$router.params
    this.setState({ productType: productType as ProductType })
    this.setState({ origin: origin as Origin })
    Taro.setNavigationBarTitle({
      title: TITLES[productType] || '列表',
    })
  }

  componentDidMount(): void {
    this.fetchListData()
  }

  componentWillUnmount(): void {
    this.props.resetState()
  }

  getSearchInput() {
    const { pageIndex, pageSize } = this.props.myProductList
    const { origin, productType } = this.state
    const searchOption = {
      pageIndex,
      pageSize,
    }
    if(origin === Origin.PUBLISH){
      searchOption['orderBy'] = SearchOrderBy.CT
      searchOption['sortDirection'] = SearchSortDirection.DESC
    } else {
      searchOption['productType'] = productType
    }
    return searchOption
  }

  isFetching(): boolean {
    const { showLoadMore, showPreload } = this.props.myProductList
    return showLoadMore || showPreload
  }

  fetchListData(): void {
    const searchInput = this.getSearchInput()
    const { origin, productType } = this.state
    if(origin === Origin.PUBLISH){
      this.props.fetchMyProductList(searchInput, productType)
    } else {
      this.props.fetchMyCollectList(searchInput)
    }
  }

  handleGotoDetail(item: Product): void {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${item.id}&productType=${this.state.productType}`,
    })
  }

  onScrollToBottom = (): void => {
    const { totalPages, pageIndex } = this.props.myProductList
    if(pageIndex >= totalPages || this.isFetching()) {
      return
    }

    this.fetchListData()
  }

  renderEmpty(): ReactNodeLike {
    const { myProductList } = this.props
    const { listData } = myProductList

    if(!listData.length && !this.isFetching()) {
      return <View className={styles.empty}>暂无相关数据</View>
    }
  }

  renderListData(): ReactNodeLike {
    const { myProductList } = this.props
    const { productType, origin } = this.state
    const { listData } = myProductList
    return listData.map((item: Product) => (
      <ProductListItem
        item={item}
        productType={productType}
        key={item.id}
        origin={origin}
        onClick={() => this.handleGotoDetail(item)}
      />
    ))
  }

  renderLoadMore(): ReactNodeLike {
    const { myProductList } = this.props
    const { showLoadMore } = myProductList
    if(showLoadMore) {
      return <AtLoadMore status="loading" />
    }
  }

  renderNoMore(): ReactNodeLike {
    const { myProductList } = this.props
    const { totalPages, pageIndex, listData } = myProductList

    // TODO: 大于 5 条并且加载完
    if((listData.length > 5 && pageIndex >= totalPages)) {
      return <AtLoadMore status="noMore" noMoreTextStyle="color: #c8c8c8" />
    }
  }

  renderScrollView(): ReactNodeLike {
    const Threshold = 20

    return (
      <ScrollView
        className={styles.scrollContainer}
        scrollY
        scrollWithAnimation
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToLower={this.onScrollToBottom} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
      >
        {this.renderEmpty()}
        {this.renderListData()}
        {this.renderLoadMore()}
        {this.renderNoMore()}
      </ScrollView>
    )
  }

  renderToast() {
    const { myProductList } = this.props
    const { isToastOpened, toastText } = myProductList

    return <AtToast isOpened={isToastOpened} hasMask status="error" text={toastText}></AtToast>
  }

  render() {

    const { showPreload } = this.props.myProductList
    return (
      <View className={styles.container}>
        { showPreload ? <Preload /> : this.renderScrollView() }
        {this.renderToast()}
      </View>
    )
  }
}

export default MyProductList as ComponentClass<PageOwnProps, PageState>
