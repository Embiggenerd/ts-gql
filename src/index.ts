import "reflect-metadata";
import 'dotenv/config'
import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";


(async () => {
    const app = express();
    app.get('/', (_, res) => {
        return res.send('herro')
    })
    await createConnection().then(() => console.log('typeorm connected to db'))
    const apolloServer = new ApolloServer({
        schema: await buildSchema(
            {
                resolvers: [UserResolver]
            }),
        context: ({req, res}) => ({ req, res })
    })

    apolloServer.applyMiddleware({ app })
    app.listen(4000, () => {
        console.log('express started on 4000')
    })
})()
