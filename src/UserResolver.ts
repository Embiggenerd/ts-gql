import { Mutation, Resolver, Query, Arg } from 'type-graphql'

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return 'hi'
    }

    @Mutation()
    async register(
        @Arg('email') email: string,
        @Arg('password')password: string
    ) {
        await User.insert()
        return
    }
}