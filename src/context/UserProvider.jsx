import axios from 'axios'
import React, { createContext } from 'react'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env

export const UserContext = createContext()
const UserProvider = ({children}) => {

    let getProfileData = async ()=>{
       let {data} = await axios.get(`${API_BASE_URL}/user/getuserprofile `, {
        withCredentials: true
       })

       if(data?.data){
        let profileData = data?.data
        return profileData
       }
    }

    let value = {
        getProfileData
    }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserProvider