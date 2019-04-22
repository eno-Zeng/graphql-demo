// input(输入)类型的定义
import {
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql'

const InputObject = new GraphQLInputObjectType({
  name: 'InputObject',
  fields: {
    username: {
      type: GraphQLString,
      defaultValue: 'eno',
    },
    password: {
      type: GraphQLString,
      defaultValue: '123456'
    }
  }
});

export default InputObject;