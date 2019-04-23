# GraphQL NodeJs 的 api 使用案例

> 使用 `graphql.js` `new GraphQL[*]Type`写法

**使用**
```bash
npm i
npm i -g nodemon
npm start
```

* 对象类型的创建 ================> ./src/graphql/query/fields/ObjectType.js
* 字段非空限定 ==================> ./src/graphql/query/fields/ObjectType.js
* 枚举类型(enum)的创建 ==========> ./src/graphql/query/fields/EnumType.js
* 联合类型(union)的创建 =========> ./src/graphql/query/fields/UnionType.js
* interface创建 ================> ./src/graphql/query/fields/InterfaceType.js
* 以上类型包括基本类型的使用  ====> ./src/graphql/query/Query.js
* 接收参数 =====================> ./src/graphql/query/fields/Query.js
* 输入类型的创建 ================> ./src/graphql/mutation/fields/InputObject.js
* 输入类型的使用 ================> ./src/graphql/mutation/Mutation.js