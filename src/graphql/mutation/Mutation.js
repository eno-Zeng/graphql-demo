import { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInputObjectType,
} from 'graphql'
import fs from 'fs'
import path from 'path'

import InputObject from './fields/InputObject'
import Login from './fields/Login'
import {GraphQLUpload} from 'graphql-upload'

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
    },
    file: {
      args: {
        file: {
          type: GraphQLUpload,
        },
      },
      type: GraphQLString,
      resolve(root, args) {
        const { file = '' } = args;
        const buffer = Buffer.from(file, 'base64');
        fs.writeFile(path.join(__dirname, './file.jpg'), buffer, err => {
          if(err) {
            console.log('width error');
          }else {
            console.log('ok');
          }
        })
        return 'ok';
      }
    }
  }
});

export default Mutation;