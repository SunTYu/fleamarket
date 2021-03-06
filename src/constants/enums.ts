export enum Status {
  FOR_SALE = 'FOR_SALE',
  SALE_OUT = 'SALE_OUT',
  FREEZE = 'FREEZE'
}

export enum ExchangeStatus {
  AGREED = 'AGREED',
  APPLIED = 'APPLIED',
  REJECTED = 'REJECTED'
}

export enum ExchangeStatusText {
  AGREED = '同意置换',
  APPLIED = '候选中',
  REJECTED = '已拒绝'
}

export enum Platform {
  WECHAT
}

export enum ProductType {
  GOODS = 'GOODS',
  PURCHASE = 'PURCHASE'
}

export enum Origin {
  PUBLISH = 'PUBLISH',
  COLLECT = 'COLLECT'
}

export enum ProductStatus {
  ALL = 'ALL',
  FOR_SALE = 'FOR_SALE',
  SALE_OUT = 'SALE_OUT'
}

export enum RefreshDataType {
  RESET_PAGE = 'RESET_PAGE',
  ADD_PAGE = 'ADD_PAGE'
}

export enum ProductHandleType {
  SOLDOUT = '下架',
  ACTIVATE = '激活'
}

export enum ToastStatus {
  ERROR = 'error',
  LOADING = 'loading',
  SUCCESS = 'success'
}

export enum SearchOrderBy {
  RC = 'RC',
  CT = 'CT',
  UT = 'UT',
  PC = 'PC'
}

export enum SearchSortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum CertifyEmail {
  UNCERTIFIED = 'UNCERTIFIED',
  CERTIFIED = 'CERTIFIED'
}

export enum ImageScenes {
  PULP = 'pulp',
  TERROR = 'terror',
  POLITICIAN = 'politician'
}

export enum AuditImageStatus {
  ERROR = 'error',
  SUCCESS = 'success'
}
