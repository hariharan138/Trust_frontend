import React from 'react'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import dd from './Displaydata.module.css'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env

const DisplaygetData = ({ _id, Name, email, address, phone, image, role, searchedResult, setSearchedResult}) => {

 let deleteUser = async (userRole, id)=>{

  try{
    let {data} = await axios.delete(`${API_BASE_URL}/admin/delete/${userRole}/${id}`, {
      withCredentials: true
    })
    if(data?.data){
      setSearchedResult(searchedResult.filter(ele=> ele._id != data?.data._id))
    }
  }
catch(err){
  console.log(err.response?.data?.message)
}
  
 }

  return (
     <div className={dd.card} key={_id}>

          <div className={dd.imgContainer}>
              <img src={image.url!="N/A" ? image.url: "https://th.bing.com/th/id/OIP.5uW6Y-lSAO-logZJQosljAHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.6&pid=1.7"} alt="" style={{width: "100px", height: "100px"}}/>
          </div>

          <div className={dd.personalDetail}>
              <p   className={dd.field}>Name: <span className={dd.name}>{Name}</span></p>
              <div className={dd.field}>Phone: <span className={dd.phone}> {phone}</span> </div>
              <div className={dd.field}>Address: <span className={dd.address}> {address}</span></div>
          {/* <div className="card-content"> */}
              {/* <p className="card-subtext">{phone}</p> */}
              {/* <IconButton aria-label="delete" color='warning'
              style={{fontSize: "20px", height: "35px", width: "35px", float: "right" ,backgroundColor: "#cc9d70"}}
              >
              <DeleteIcon />
              </IconButton> */}

              <Button variant="contained" 
               color='error'
               onClick={()=> deleteUser(role, _id)} 
               sx={{width: "70%", margin: "10px auto"}}
               startIcon={<DeleteIcon />}>
  Delete
</Button>
          {/* </div> */}
          </div>

      </div>
  )
}

export default DisplaygetData