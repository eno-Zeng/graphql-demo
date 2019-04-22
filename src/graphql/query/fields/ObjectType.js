// 对象类型的创建
import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql'

const ObjectType = new GraphQLObjectType({
  name: 'ObjectType',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

export default ObjectType;