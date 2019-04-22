import express from 'express'
import graphqlHttp from 'express-graphql'
import graphqlSchema from '../graphql/index'

const router = express.Router();

router.use('/graphql', graphqlHttp((req, res, params) => {
  return {
    schema: graphqlSchema,
    // rootValue: graphqlSchema,
    graphiql: true
  }
}));

export default router;