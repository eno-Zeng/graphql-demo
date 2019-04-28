import express from 'express'
import cors from 'cors'

import graphql from './router/graphql'

const app = express();

app.use(cors())
app.use((req, res, next) => {
  if(req.method.toLocaleUpperCase() === 'OPTIONS') {
    res.sendStatus(200);
  }else {
    next();
  }
})
app.use(graphql);

export default app;