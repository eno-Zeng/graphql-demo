import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

const Login = new GraphQLObjectType({
  name: 'Login',
  fields: {
    code: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    }
  }
});

export default Login;