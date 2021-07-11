import React, { useEffect } from 'react'
import { LOG_OUT } from '../../graphQl/mutations/mutations'
import { useMutation } from "@apollo/client"
const Logout = () => {
    const [logout, { data, error, loading }] = useMutation(LOG_OUT)
    useEffect(()=>{
        const refreshToken = localStorage.getItem("refreshToken")
        logout({
            variables:{
                refreshToken
            }
        })
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("token")
        window.location.replace("/login")
    },[])

    return (
       <>
       </>
    )
}

export default Logout
