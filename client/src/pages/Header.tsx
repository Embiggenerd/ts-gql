import React from 'react'
import { Link } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { setAccessToken } from '../accessToken';

interface Props { }

export const Header: React.FC<Props> = (props) => {
    const { data, loading } = useMeQuery({ fetchPolicy: "network-only" })
    const [logout, { client }] = useLogoutMutation()
    let body: any = null;

    if (loading) {
        body = null;
    } else if (data && data.me) {
        body = <div>You are logged in as: {data.me.email}</div>
    } else {
        body = <div>You are not logged in</div>
    }

    return (
        <header>
            <div><Link to="/login">Login</Link></div>
            <div><Link to="/register">Register</Link></div>
            <div><Link to="/bye">Bye</Link></div>
            <div><Link to="/">Home</Link></div>
            {!loading && data && data.me  ? <button onClick={async () => {
                await logout()
                setAccessToken(null)
                await client!.resetStore()
            }}>Logout</button> : null}
            {body}
        </header>
    )
}