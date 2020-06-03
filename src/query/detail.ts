import { gql } from 'apollo-boost'

export const DetailFragment = gql`
  fragment DetailFragment on ProductInfo {
    id
    title
    price
    coverUrl
    category
    categoryName
    description
    coverUrl
    status
    createTime
    updateTime
    pictures
    contacts
    readCount
    agreeExchange
    owner {
      id
      nickname
      avatarUrl
      brief
      certification
    }
  }
`

export const goodsDetailQuery = gql`
  query($id: String!) {
    detailInfo: goodsById(id: $id) {
      ...DetailFragment
    }
  }
  ${DetailFragment}
`

export const receivedExchangesQuery = gql`
  query($targetId: String!) {
    receivedExchanges(targetId: $targetId) {
      id: String
      userId: String
      targetId: String
      sourceId: String
      status: ExchangeStatus
      goods {
        title
        price
        coverUrl
        readCount
      }
      createTime: Date
      updateTime: Date
    }
  }
`

export const purchaseDetailQuery = gql`
  query($id: String!) {
    detailInfo: purchaseById(id: $id) {
      ...DetailFragment
    }
  }
  ${DetailFragment}
`

export const contactsQuery = gql`
  query($userId: String!, $ids: [String]!) {
    contacts(userId: $userId, ids: $ids) {
      id
      content
      type
      label
    }
  }
`

export const exchangeableGoodsQuery = gql`
  query {
    exchangeableGoods {
      id
      title
      status
      price
      readCount
      coverUrl
      createTime
    }
  }
`

export const exchangeGoodsMutation = gql`
  mutation($exchangeInput: ExchangeInput) {
    exchangedGoods: exchangeGoods(exchangeInput: $exchangeInput)
  }
`

export const pullOffShelvesGoodsMutation = gql`
  mutation($id: String!, $userId: String!) {
    pullOffShelvesGoods(id: $id, userId: $userId)
  }
`
export const putOnShelvesGoodsMutation = gql`
  mutation($id: String!, $userId: String!) {
    putOnShelvesGoods(id: $id, userId: $userId)
  }
`

export const pullOffShelvesPurchaseMutation = gql`
  mutation($id: String!, $userId: String!) {
    pullOffShelvesPurchase(id: $id, userId: $userId)
  }
`
export const putOnShelvesPurchaseMutation = gql`
  mutation($id: String!, $userId: String!) {
    putOnShelvesPurchase(id: $id, userId: $userId)
  }
`

export const increaseGoodsReadCount = gql`
  mutation($id: String!) {
    increaseGoodsReadCount(id: $id)
  }
`
export const increasePurchaseReadCount = gql`
  mutation($id: String!) {
    increasePurchaseReadCount(id: $id)
  }
`
