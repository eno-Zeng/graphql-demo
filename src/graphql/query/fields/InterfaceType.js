// interface 的定义
import {
  GraphQLInterfaceType,
  GraphQLID,
  GraphQLString,
} from 'graphql'

const InterfaceType = new GraphQLInterfaceType({
  name: 'InterfaceType',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    }
  }
});

export default InterfaceType;