import React from 'react'
import { useByeQuery } from '../generated/graphql';

interface Props {

}

export const Bye: React.FC<Props> = () => {
    const { data, loading, error} = useByeQuery()

    if(loading){
        return <div>loading</div>
    }
    if(error) {
        console.log(error)
        return <div>{error.message}</div>
    }
    if(!data){
        return <div>no data</div>
    }
    return (
        <div>{data.bye}</div>
    )
}