import React, { useState } from 'react'
import { useLoginMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';

  export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login] = useLoginMutation()
    return (
        <form onSubmit={async e => {
            e.preventDefault()
            console.log('password', password)
            console.log('email', email)
            const res = await login({ variables: { email, password } })
            console.log('res', res)
            if (res && res.data){
                setAccessToken(res.data.login.accessToken)
            }
            history.push('/')
        }}>
            <div>
                <input
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    placeholder="pasword"
                    onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}
