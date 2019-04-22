import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql'

import InputObject from './fields/InputObject'
import Login from './fields/Login'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: Login,
      args: {
        user: {
          type: InputObject,
          defaultValue: {}
        }
      },
      resolve(root, args) {console.log('args: ', args)
        const {username, password} = args.user;
        if(username === 'eno' && password === '123456') {
          return {
            code: 200,
            username
          }
        }else {
          return {
            code: 401,
            username
          }
        }
      }
    }
  }
});

export default Mutation;