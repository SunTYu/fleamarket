import { gql } from 'apollo-boost'

export const collectedQuery = gql`
query collectedQuery($collectInput:CollectInputQuery) {
  collected (collectInput:$collectInput ){
    result
  }
}`

export const collectMutation = gql`
mutation collectMutation($collectInput:CollectInputQuery){
  collect(collectInput:$collectInput)
}
`

export const unCollectMutation = gql`
mutation unCollectMutation($collectInput:CollectInputQuery){
  unCollect(collectInput:$collectInput)
}
`