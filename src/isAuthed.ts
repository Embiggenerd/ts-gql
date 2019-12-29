import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./myContext";
import { verify } from "jsonwebtoken";

export const isAuthed: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization']

    if (!authorization) {
        throw new Error('Not authorized')
    }
    console.log('isAuth invoked')
    try {
        const token = authorization.split(" ")[1]
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
        context.payload = payload as any
    } catch (e) {
        console.log(e)
        throw new Error("Not authorized")
    }
    return next()
}