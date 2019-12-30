import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from './App';
import ApollogClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { getAccessToken } from './accessToken';
import { access } from 'fs';

const client = new ApollogClient({
    uri: "http://localhost:4000/graphql",
    credentials: 'include',
    request: operation => {
        const accessToken = getAccessToken()
        operation.setContext({
            headers: {
                authorization: accessToken ? `bearer ${accessToken}` : ''
            }
        })
    }
})
ReactDOM.render(<ApolloProvider client={client} ><Routes /></ApolloProvider>, document.getElementById('root'));