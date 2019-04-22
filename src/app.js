import express from 'express'
import graphql from './router/graphql'

const app = express();

app.use(graphql);

export default app;