# GraphQL NodeJs 的 api 使用案例

## **项目启动**

```bash
npm i
npm i -g nodemon
npm start
```

访问 [http://localhost:3000/graphql](http://localhost:3000/graphql)

## graphql 基本 api 使用

### 创建schema

```js
import {GraphqlSchema} from 'graphql'
const schema = new GraphqlSchema(options: Object)
```

options

* query: `GraphQLObjectType`, 必须属性, 一个`GraphQLObjectType`的实例
* mutation: `GraphQLObjectType`, 可选字段, 一个`GraphQLObjectType`的实例

### 字段的创建

字段可以不断嵌套, 字段下可以创建子字段, 子字段下可以继续创建子字段</br>
`query`类型的子字段定义查询获取操作, `mutation`类型的子字段定义修改变更等操作</br>

```js
const schema = new GraphqlSchema({
  query: {
    filds: {
      fildName: {
        type: GraphQLType,
        args: Object,
        resolve: Function
      },
      ...
    }
  }
})
```

* type: 字段的类型, 属性值为一个GraphQL中规定的数据类型
* args: 访问该字段是需要的参数

  ```js
  args: {
    argName: {
      type: GraphQLType,
      default: Any
    }
  }
  ```

* resolve: 字段被访问时的处理函数
  * 参数:
    1. root: ???
    2. args: 接收到的参数列表
    3. content: 上下文对象(???)
    4. fildInfo: 字段的信息
  * 返回值: 该函数的返回值既该字段的值, 支持`async`函数

### 标量类型: ID, String, Int, Float, Boolean

```js
import {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
}
const schema = new GraphqlSchema({
  query: {
    filds: {
      // ID
      id: {
        type: GraphQLID,
        resolve() {
          return 'id';
        }
      },
      // String
      str: {
        type: GraphQLString,
        resolve() {
          return 'str';
        }
      },
      // Int
      intNum: {
        type: GraphQLInt,
        resolve() {
          return 'int';
        }
      },
      // Float
      floatNum: {
        type: GraphQLFloat,
        resolve() {
          return 'float';
        }
      },
      // Boolean
      bool: {
        type: GraphQLBoolean,
        resolve() {
          return 'bool';
        }
      },
    }
  }
})
```

### 对象类型

```js
import { GraphqlObjectType } from 'graphql'
const ObjectType = new GraphqlObjectType(options: Object)
```

options

* name: `String`, 对象类型的名称
* files: `Object`, 子字段集

```js
new GraphQLObjectType({
  ...
  files: {
    fileName: {
      name: String,
      files: Object,
    }
  }
})
```

### 字段的非空限定

非空的字段属于`GraphQLNonNull`类型</br>
用于规定默写子字段必须存在或某些参数不能为空值(`null`或`undefined`)</br>

```js
import {
  GraphQLObject,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'

var login = {
  type: new GraphQLObject({
    name: 'Login',
    files: {
      result: {
        type: GraphQLNonNull(GraphQLBoolean)
      },
      message: {
        type: GraphQLString
      }
    }
  }),
  args: {
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    }
  },
  resolve() {
    return {
      result: true,
    }
  }
}
```

上面定义了一个login的字段</br>
该字段接收两个参数 username 和 password, 并限定两个字段都不能为空</br>
规定了其返回类型为`Login`, 有 result 和 message 两个子字段, 并且 result 必须存在</br>

### enum: 枚举类型

枚举类型及对使用枚举类型的字段的可选值做一个范围限定</br>
枚举类型会定义一个值的集合, 使用该类型的字段, 其值(resolve函数返回值)只能在这个集合内

```js
import { GraphQLEnumType } from 'graphql'

const EnumType = new GraphQLEnumType({
  name: 'EnumType',
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
  }
});

// 使用这个枚举类型
const enum = {
  type: EnumType,
  resolve() {
    return 'str'; // => 'string'
  }
}
```

使用枚举类型后, resolve函数的返回结果会和枚举中的可选值的value匹配,</br>
如果匹配则使用这个值的名称(对于这个逻辑我也是懵逼的)

### union: 联合类型

union包含了多个对象类型(**只能是对象类型**), 使用union的字段可以是这个union中包含的类型中的一个</br>
如果一个字段不确定最后返回值的类型是几个类型中的哪一个, 那么这时候就可以使用union了</br>

```js
import {
  GraphQLBoolean,
} from 'graphql'

// 假设现在已有三个对象类型分别为Type1, Type2, Type3, 使用这个三个对象类型创建一个union类型
const UnionType = new GraphQLBoolean({
  name: 'UnionType',
  types: [Type1, Type2, Type3],
  // 决定使用该类型的字段的返回类型, value为字段的resolve函数返回值
  resolveType(value) {
    ...
    return [Type1|Type2|Type3];
  }
});

// 使用这个类型
const union = {
  type: UnionType,
  resolve() {
    ...
  }
}
```

resolveType 函数参数:

1. value: 使用该类型的字段的resolve函数返回值
2. IncomingMessage: ???
3. fieldInfo: 使用这个类型的字段信息
4. type: 该类型本身

### interface

```js
import {
  GraphQLInterfaceType,
  GraphQLNonNULL
  GraphQLID,
  GraphQLObjectType,
} from 'graphq'

// 定义一个有ID字段的interface
const InterfaceType = new GraphQLInterfaceType({
  name: 'InterfaceType',
  files: {
    id: {
      type: GraphQLNonNULL(GraphQLID)
    }
  }
});

// 定义一个实现上面接口的对象类型
const InterfaceObjectType = new GraphQLObjectType({
  name: 'InterfaceObjectType',
  interface: [InterfaceType], // 实现的接口列表
  filds: {
    // 必须有InterfaceType定义过的字段, 而且类型一致
    id: {
      type: GraphQLNonNULL(GraphQLID)
    }
  }
});
```

### input: 输入类型

以上说的类型称为输出类型(output), 用于字段的返回结果限定, 当然一些简单的标量类型参数也可以使用输出类型</br>
输入类型用于参数的类型限定, 当参数不再是简单的标量类型而是一个复杂对象时, 就要使用输入类型</br>
输入类型与对象类型相似, 只不过输入类型用于传入参数, 对象类型用于字段输出</br>

```js
import {
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql'

// 定义一个登录的参数限定类型
const LoginInputObject = new GraphQLInputObjectType({
  name: 'LoginInputObject',
  fields: {
    username: {
      type: GraphQLString,
      defaultValue: '',
    },
    password: {
      type: GraphQLString,
    }
  }
});

// 使用
const login = {
  ...,
  args: {
    user: LoginInputObject,
  }
}
```