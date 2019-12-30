import React, { useState } from 'react'
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

interface Props {

}

export const Register: React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [register] = useRegisterMutation()
    return (
        <form onSubmit={async e => {
            e.preventDefault()
            console.log('password', password)
            console.log('email', email)
            const res = await register({ variables: { email, password } })
            console.log('res', res)
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
            <button type="submit">Submit</button>
        </form>
    )
}