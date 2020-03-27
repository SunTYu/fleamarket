import Taro, { memo, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtImagePicker }  from 'taro-ui'

import './index.scss'
import { MaxImageCount, MaxImageSize, ImageSuffix } from '../../constants/publish'

interface InProps {
  onSetVal: (key, value) => void
  showErrorMessage: (name) => void
  imagesUrls: Array<Publish.InPickerImageFiles>
}

function PublishImages(props: InProps) {

  const [files, setFiles] = useState(props.imagesUrls || [])

  Taro.useEffect(() => {
    setFiles(props.imagesUrls)
  }, [props.imagesUrls])

  const showImgError = () => {
    props.showErrorMessage('images')
  }

  const validImage = (files) => {
    const validFiles = files.filter((item) => {
      const { file, url, qiniuUrl } = item
      if(qiniuUrl) return true
      const { size } = file
      const isOversize = size > MaxImageSize
      const urlArr = url.split('.')
      const suffix = urlArr[urlArr.length-1].toLowerCase()
      const isRightType = ImageSuffix.includes(suffix)
      return !isOversize && isRightType
    })
    if(validFiles.length<files.length){
      showImgError()
    }
    return validFiles
  }

  const onChange = (files, operationType) => {
    let currentFiles = operationType === 'add' ? validImage(files) : files
    if(currentFiles.length > MaxImageCount){
      showImgError()
      currentFiles = files.slice(0, 10)
    }
    setFiles(currentFiles)
    props.onSetVal('imagesUrls', currentFiles)
  }
  const onFail = (mes) => {
    throw (mes)
  }

  return (
    <View className="publish_images">
      <AtImagePicker
        showAddBtn={files.length<10}
        length={4}
        count={MaxImageCount - files.length}
        files={files}
        onChange={onChange}
        onFail={onFail}
      />
    </View>
  )

}


export default memo(PublishImages)