import Taro, { memo } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ProductItem from '../productItem'
import { ProductType } from '../../constants/enums'

import styles from './index.module.scss'

interface InProps {
  productListData: Global.Goods[]
  productType: ProductType
}

function ProductList(props: InProps) {
  const { productListData =[], productType } = props


  const onClickEvent = (id: string) => () => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}&productType=${productType}`,
    })
  }

  return (
    <View className={styles.wrapperList}>
      {
        productListData.length ?
          productListData.map(item =>
            <View className={styles.listItem} key={item.id} onClick={onClickEvent(item.id)}>
              <ProductItem productData={item} />
            </View>
          )
          : (
            <View className={styles.noProduct}><Text>暂无相关数据</Text></View>
          )
      }

    </View>
  )

}

export default memo(ProductList)
