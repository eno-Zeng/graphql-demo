// 枚举类型的创建
import {
  GraphQLEnumType,
} from 'graphql'

const EnumType = new GraphQLEnumType({
  name: 'EnumType',
  /**
   * 可选值集合
   * {[key: String]: {value: any}}
   * 使用该集合的字段的处理函数通过 `return values[key].value`, graphql会把真实的返回值映射为 values 的 key(说实话这个逻辑有点让我怀疑人生)
   * 因为 key 才是真实的返回值, 所以枚举类型的值范围只能是字符串
   */
  values: {
    string: {
      name: 'String',
      value: 'str',
    },
    number: {
      name: 'Number',
      value: 'num',
    },
    boolean: {
      name: 'Boolean',
      value: 'bool',
    }
  },
});

export default EnumType;