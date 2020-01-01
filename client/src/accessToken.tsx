type Token = string | null

export let accessToken: Token = null

export const setAccessToken = (token: Token) => {
    accessToken = token
}

export const getAccessToken = () => accessToken