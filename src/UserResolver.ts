import { Mutation, Resolver, Query, Arg } from 'type-graphql'
import { hash } from 'bcryptjs'
import { User } from './entity/User'

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi'
    }

    @Query(()=>[User])
    users() {
        return User.find()
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
        } catch(e){
            console.log(e)
            return false
        }
        return true;
    }
}