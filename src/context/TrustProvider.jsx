import axios from 'axios'
import React, { createContext, useState } from 'react'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env

export const TrustContext = createContext()

const TrustProvider = (props) => {
    let getTotalTrust = async ()=>{
       try{
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env
        let {data} = await axios.get(`${API_BASE_URL}/admin/getnooftrusts`, {
            withCredentials: true
        })

        let totalNoOfTrust = data?.data
        if(totalNoOfTrust  || totalNoOfTrust==0){
            return totalNoOfTrust
        }
       }
       catch(err){
        console.log(err.response?.message)
        console.log(err.response?.data)
       }
    }

    let getTotalTransactions = async ()=>{
        try{
            let {data} = await axios.get(`${API_BASE_URL}/admin/getnooftransactions`, {
                withCredentials: true
            })
            let totalTransactions = data?.data
            return totalTransactions
        }
        catch(err){
            console.log(err.response?.data.msg)
            console.log(err.response?.data)
        }
    }

    let getTotalUser = async ()=>{
        try{
            let {data} = await axios.get(`${API_BASE_URL}/admin/getnoofusers`, {
                withCredentials: true
            })
            let totalTransactions = data?.data
            return totalTransactions
        }
        catch(err){
            console.log(err.response?.data.msg)
            console.log(err.response?.data)
        }
    }
    

    let value={getTotalTrust, getTotalUser, getTotalTransactions}
  return (
   <TrustContext.Provider value={value} >
        {props.children}
   </TrustContext.Provider>
  )
}

export default TrustProvider