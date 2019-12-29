import "reflect-metadata";
import 'dotenv/config'
import express from "express";
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
import cookieParser from 'cookie-parser'
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./auth";

(async () => {
    const app = express();
    app.use(cookieParser())
    app.get('/', (_, res) => {
        return res.send('err')
    })
    app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.jid
        if (!token) {
            return res.send({ ok: false, accessToken: '' })
        }

        let payload: any = null;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch (error) {
            console.log(error)
            return res.send({ ok: false, accessToken: '' })
        }

        const user = await User.findOne({
            id: payload.userID
        })

        if (!user) {
            return res.send({ ok: false, accessToken: '' })
        }

        res.cookie('jid', createRefreshToken(user), {
            httpOnly: true
        })


        return res.send({ ok: true, accessToken: createAccessToken(user) })
    })
    await createConnection().then(() => console.log('typeorm connected to db'))
    const apolloServer = new ApolloServer({
        schema: await buildSchema(
            {
                resolvers: [UserResolver]
            }),
        context: ({ req, res }) => ({ req, res })
    })

    apolloServer.applyMiddleware({ app })
    app.listen(4000, () => {
        console.log('express started on 4000')
    })
})()
