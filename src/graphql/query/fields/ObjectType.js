// 对象类型的创建
import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql'

const ObjectType = new GraphQLObjectType({
  name: 'ObjectType',
  fields: {
    id: {
      type: GraphQLID
    },
    // 必要字段(字段值不能为空值nll/undefined)
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    age: {
      type: GraphQLInt
    }
  }
});

export default ObjectType;