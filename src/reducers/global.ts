import { SET_AUTH_INFO, SET_PRODUCT_SEARCH, RESET_PRODUCT_SEARCH } from '../constants/actionTypes'
import { ProductType, SearchOrderBy, SearchSortDirection, ProductStatus } from '../constants/enums'

const INITIAL_STATE = {
  isOpenedAuthInfo: false,
  productSearch: {
    categoryId: '',
    currentProductType: ProductType.GOODS,
    title: '',
    orderBy: SearchOrderBy.RC,
    sortDirection: SearchSortDirection.DESC,
    status: ProductStatus.ALL,
  },
}

export default function global(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_AUTH_INFO:
      return {
        ...state,
        isOpenedAuthInfo: action.payload,
      }
    case SET_PRODUCT_SEARCH: {
      const { productSearch } = state
      return {
        ...state,
        productSearch: {
          ...productSearch, ...action.payload,
        },
      }
    }
    case RESET_PRODUCT_SEARCH:
      return {
        ...state,
        productSearch: INITIAL_STATE.productSearch,
      }
    default:
      return state
  }
}

