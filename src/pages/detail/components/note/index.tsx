import Taro, { memo } from '@tarojs/taro'
import { View } from '@tarojs/components'

import styles from './index.module.scss'

function DetailNote() {

  return (
    <View className={styles.detail_note}>
      <View className={styles.title}>
        易货换货说明：
      </View>
      <View className={styles.content}>
        易货换货功能，用于方便易货双方及时获取意向来源，确认意向后，希望彼此及时联系，提升易货成功机率！
      </View>

      <View className={styles.title}>
        免责说明：
      </View>
      <View className={styles.content}>
        易货换货功能，用于方便易货双方及时获取意向来源，确认意向后，希望彼此及时联系，提升易货成功机率！
      </View>

    </View>
  )

}


export default memo(DetailNote)
