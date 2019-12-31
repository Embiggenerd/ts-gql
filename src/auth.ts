import { User } from "./entity/User";
import { sign } from 'jsonwebtoken'

export const createRefreshToken = (user: User) => {
    return sign({
        userID: user.id,
        refreshTokenVersion: user.refreshTokenVersion
    }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" })
}

export const createAccessToken = (user: User) => {
    return sign({ userID: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "1m" })
}