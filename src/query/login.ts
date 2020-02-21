import { gql } from 'apollo-boost'

export const loginQuery = gql`
mutation AuthLogin($code: String!) {
  authLogin(code: $code) {
    openid
    session_key
  }
}
`

export const countQuery = gql`
{
  cat(id: 1) {
    id
    name
  }
}
`