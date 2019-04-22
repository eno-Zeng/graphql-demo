// 联合类型的创建
import {
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql'

// 创建几个作为 UnionType 可选类型的对象类型
const StringObject = new GraphQLObjectType({
  name: 'StringObject',
  fields: {
    str: {
      type: GraphQLString
    },
  }
});
const IntObject = new GraphQLObjectType({
  name: 'IntObject',
  fields: {
    num: {
      type: GraphQLInt
    },
  }
});
const BooleanObject = new GraphQLObjectType({
  name: 'BooleanObject',
  fields: {
    bool: {
      type: GraphQLBoolean
    },
  }
});

const UnionType = new GraphQLUnionType({
  name: 'UnionType',
  // 可选类型的集合(数组), 只能接受对象类型
  types: [StringObject, IntObject, BooleanObject],
  /**
   * 必须提供一个 resolveType 函数用于决定使用哪个类型的数据格式
   * 参数列表: 
   *  1. val: 使用该类型的字段处理函数返回值
   *  2. IncomingMessage: 这个参数不清楚, 估计是http请求的信息
   *  3. fieldInfo: 使用这个类型的字段信息
   *  4. type: 该类型本身(例如, 这个类型的 type 就是 UnionType)
   */
  resolveType(val, IncomingMessage, fieldInfo, type) {
    if(val.str) {
      return StringObject;
    } else if(val.num) {
      return IntObject;
    } else if(val.bool) {
      return BooleanObject;
    }
  }
});

export default UnionType;