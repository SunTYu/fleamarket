import { Dispatch } from 'redux'

import client from '../graphql-client'
import {
  FETCH_MY_PRODUCT_LIST,
  FETCH_MY_PRODUCT_LIST_SUCCESS,
  FETCH_MY_PRODUCT_LIST_FINALLY,
  RESET_MY_PRODUCT_LIST,
  UPDATE_MY_PRODUCT_LIST_DATA, FETCH_MY_PRODUCT_LIST_ERROR, DELETE_MY_COLLECT_LIST_DATA,
} from '../constants/actionTypes'
import { ProductType } from '../constants/enums'
import { searchMyGoodsQuery, searchMyPurchaseQuery } from '../query/search'
import { searchMyCollectQuery } from '../query/collect'

const fetchStart = () => {
  return {
    type: FETCH_MY_PRODUCT_LIST,
  }
}

const fetchSuccess = (payload) => {
  return {
    type: FETCH_MY_PRODUCT_LIST_SUCCESS,
    payload,
  }
}

const fetchError = (payload) => {
  return {
    type: FETCH_MY_PRODUCT_LIST_ERROR,
    payload,
  }
}

const fetchFinally = () => {
  return {
    type: FETCH_MY_PRODUCT_LIST_FINALLY,
  }
}

export const resetMyProductListState = () => {
  return {
    type: RESET_MY_PRODUCT_LIST,
  }
}

export const updateListData = (payload) => {
  return {
    type: UPDATE_MY_PRODUCT_LIST_DATA,
    payload,
  }
}

export function fetchMyProductList(searchInput, productType) {
  return async(dispatch: Dispatch) => {
    const query = productType === ProductType.GOODS ? searchMyGoodsQuery : searchMyPurchaseQuery
    try {
      dispatch(fetchStart())
      const { data } = await client.query({ query, variables: { searchInput }})
      dispatch(fetchSuccess(data))
    } catch (error) {
      dispatch(fetchError({ error }))
    } finally {
      dispatch(fetchFinally())
    }
  }
}

export const deleteCollectData = (payload) => {
  return {
    type: DELETE_MY_COLLECT_LIST_DATA,
    payload,
  }
}

export function fetchMyCollectList(searchInput) {
  return async(dispatch: Dispatch) => {
    try {
      dispatch(fetchStart())
      const { data } = await client.query({ query: searchMyCollectQuery, variables: { searchInput }})
      dispatch(fetchSuccess(data))
    } catch (error) {
      dispatch(fetchError({ error }))
    } finally {
      dispatch(fetchFinally())
    }
  }
}

