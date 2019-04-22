import {GraphQLSchema} from 'graphql'
import Query from './query/Query'
import Mutation from './mutation/Mutation'

const graphql = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default graphql;