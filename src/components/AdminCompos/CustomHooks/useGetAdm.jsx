import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useGetAdm = (url) => {

    const [apidata, setApidata] = useState([])

    let getApi = async ()=>{
        try{
            let {data} = await axios.get(url, {
                withCredentials: true
            })
        if(data?.data.length>0){
            setApidata(data.data)
        }
        }
        catch(err){
            console.error('Error Response:', err.response?.data); 
        }
        
    }

    useEffect(()=>{
        getApi()
    }, [])

  return [apidata, setApidata]
}

export default useGetAdm