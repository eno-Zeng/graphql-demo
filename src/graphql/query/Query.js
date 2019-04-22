import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} from 'graphql'

import ObjectType from './fields/ObjectType'
import EnumType from './fields/EnumType'
import UnionType from './fields/UnionType'
import InterfaceType from './fields/InterfaceType'

// 创建 Query 根字段
const Query = new GraphQLObjectType({
  name: 'Query',
  // 子字段
  fields: {
    // string 类型字段
    str: {
      type: GraphQLString, // 类型
      // 字段处理函数
      resolve() {
        return 'Hello World';
      }
    },
    // Int 类型字段
    int: {
      type: GraphQLInt,
      resolve() {
        return 123;
      }
    },
    // boolean 类型字段
    bool: {
      type: GraphQLBoolean,
      resolve() {
        return true;
      }
    },
    // 对象类型字段
    obj: {
      type: ObjectType,
      resolve() {
        return {
          id: '007',
          name: 'eno',
          age: 18
        }
      }
    },
    // 接收参数的处理函数
    params: {
      type: ObjectType,
      // 参数列表
      args: {
        id: {
          type: GraphQLID, // 参数类型
          defaultValue: '007', // 默认值
        }
      },
      /**
       * root(或parent)：
       * args：该参数携带用于查询的参数
       * context：一个通过解析器链传递的对象，每个解析器可以写入和读取(基本上是解析器通信和共享信息的方法), 应该就是请求的request对象吧
       * fieldInfo：query或mutation的AST表示(这里的query和mutation不单单指Query和Mutation根字段)
       * (暂时还没研究的太清楚)
       */
      resolve(root, args, context, fieldInfo) {
        const { id } = args;
        if (id === '007') {
          return {
            id: '007',
            name: 'eno',
            age: 18
          }
        } else {
          return {
            id: '9527',
            name: 'zeng',
            age: 17
          }
        }
      }
    },
    // 枚举类型使用
    enum: {
      type: EnumType,
      resolve() {
        return 'str';  // 实际返回值: 'string'
        return 'num';  // 实际返回值: 'number'
        return 'bool'; // 实际返回值: 'boolean'
      }
    },
    // 联合类型使用
    union: {
      type: UnionType,
      resolve() {
        return {
          str: 'Hello World'
        }
      }
    },
    // 接口的使用
    itf: {
      type: new GraphQLObjectType({
        name: 'Itf',
        interfaces: [InterfaceType],
        fields: {
          id: {
            type: GraphQLID,
          },
          name: {
            type: GraphQLString,
          },
          age: {
            type: GraphQLInt,
          }
        },
      }),
      resolve() {
        return {
          id: '007',
          name: 'eno',
          age: 18,
        }
      }
    }
  }
});

export default Query;