import { Mutation, Resolver, Query, Arg, ObjectType, Field, Ctx } from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { User } from './entity/User'
import { sign } from 'jsonwebtoken'
import { MyContext } from './myContext';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi'
    }

    @Query(() => [User])
    users() {
        return User.find()
    }


    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            throw new Error('User not found')
        }

        const valid = await compare(password, user.password)

        if (!valid) {
            throw new Error('Bad password')
        }

        res.cookie('jid', sign({ userID: user.id }, "lala", { expiresIn: "7d" }))


        // successful login
        return {
            accessToken: sign({ userID: user.id }, "secret", { expiresIn: "15m" })
        }
    }


    @Mutation(() => Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const hashedPass = await hash(password, 12)

        try {

            await User.insert({
                email,
                password: hashedPass
            })
        } catch (e) {
            console.log(e)
            return false
        }
        return true;
    }
}