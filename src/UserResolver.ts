import { Mutation, Resolver, Query, Arg, ObjectType, Field, Ctx, UseMiddleware, Int } from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { User } from './entity/User'
import { MyContext } from './myContext';
import { createAccessToken, createRefreshToken } from './auth';
import { isAuthed } from './isAuthed';
import { getConnection } from 'typeorm';

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

    @Query(() => String)
    @UseMiddleware(isAuthed)
    bye(
        @Ctx() { payload }: MyContext
    ) {
        console.log('payload:', payload)
        return `User id: ${payload!.userID}`
    }

    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => Boolean)
    async revokeRefreshToken(
        @Arg('userID', () => Int) userID: number
    ) {
        await getConnection()
            .getRepository(User)
            .increment({ id: userID }, 'refreshTokenVersion', 1)

        return true
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

        res.cookie('jid', createRefreshToken(user), {
            httpOnly: true
        })


        // successful login
        return {
            accessToken: createAccessToken(user)
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