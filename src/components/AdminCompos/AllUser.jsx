import React, { useEffect, useState } from 'react'

import { Bell, Menu } from 'lucide-react'
import './Dash.css';
import DisplaygetData from './DisplaygetData';
import useGetAdm from './CustomHooks/useGetAdm';
import InputSearch from './InputSearch';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env

const AllUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [PageNo, setPageNo] = useState(1);
    const [hasNext, setHasNext] = useState(false);
  
    let dataLimitPerPage = 10;
  
    let handlePageNo = (action)=>{
        if(action == "prev"){
          if(PageNo>1){
            setPageNo((p)=> p-1)
          }
        }
  
        if(action == "next"){
          setPageNo((p)=> p+1)
        }
    }

    const [searchValue, setSearchValue] = useState("")
    const [searchFinal, setSearchFinal] = useState("")
    const [searchedResult, setSearchedResult] = useState([])

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    let [apidata, setApidata] = useGetAdm(`${API_BASE_URL}/admin/getusers/1/10`)

    let handleSearch = ()=>{
        setSearchFinal(searchValue)
    }

    let getSearchValue = async ()=>{
        try{
            setLoading(true)
            let {data} = await axios.get(`${API_BASE_URL}/admin/searchuser?search=${searchFinal}&page=${PageNo}`,  {
                withCredentials: true
            })
            setHasNext(true)
            if(data && data?.data && data.data.length>0){
                setSearchedResult(data?.data)
                setHasNext(data?.data.length < dataLimitPerPage ? true: false)
                setLoading(false)
            }
            else{
                setErrorMessage(data?.data?.msg)
                setLoading(false)
            }
        }
        catch(err){
        console.log(err.response.data.message)
        }
    }

    useEffect(()=>{
       if(searchFinal){
        getSearchValue()
       }
       else{
        setSearchedResult([])
       }
    }, [searchFinal])

    useEffect(()=>{
        getSearchValue()
    }, [PageNo])

    useEffect(()=>{
       if(!searchFinal){
            setSearchedResult(apidata)
            setErrorMessage("")
       }
    }, [searchFinal, apidata])

    const paginationTrust = {
        padding: "10px",
        // border: "2px solid red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
      }
  
      const pageBtn = {
          borderRadius: "5px",
          backgroundColor: "#3182ce",
          padding: "2px",
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
          outline: "none",
          border: "none"
      }
  
   
    return (
        <div className="dashboard">
            {/* Sidebar */}
            {/* <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Dashboard</h2>
                    <button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)}>
                        <ChevronDown />
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-button" onClick={() => navigate("/Home")}><Home /> Home</button>
                    <button className="nav-button" onClick={() => navigate("/alluser")}><LayoutDashboard />User</button>
                    <button className="nav-button" onClick={() => navigate("/alltrust")}><HandHeart />Trust</button>
                    <button className="nav-button"><User /> Profile</button>
                    <button className="nav-button" onClick={() => navigate("/set")}><Settings /> Settings</button>
                    <button className="nav-button logout"><LogOut /> Logout</button>
                </nav>
            </aside> */}
            
            <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <header className="header">
                    <button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)}>
                        <Menu />
                    </button>
                    <h1 className='typeusers-admin-title'>All Users</h1>
                    <div className="header-actions">
                    <InputSearch searchValue={searchValue} setSearchValue={setSearchValue} />

                    {/* <button onClick={handleSearch}>search</button> */}
                    <IconButton onClick={handleSearch}>
                            <SearchOutlinedIcon className='search-btn1' sx={{width: "35px", height: "35px"}} />
                    </IconButton>
                        <button className="icon-button">
                            <Bell />
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="dashboard-content">
                    <div className="card-grid">

                    {loading && <div>Loading Please wait</div>}
                    {errorMessage && <div>{errorMessage}</div>}

                    {!loading && !errorMessage && searchedResult.length>0 && searchedResult.map(({Name, _id, email, address, phone, image, role}) => {
                            return (
                                
                           
                                   <DisplaygetData setSearchedResult={setSearchedResult} searchedResult={searchedResult}  key={_id} _id={_id} Name={Name} email={email} address={address} role={role} image={image} phone={phone} />

                                
                            )
                        })
                        }



                    </div>
                    <div style={paginationTrust} >
                <button style={pageBtn}
                onClick={()=> handlePageNo('prev')}
                disabled={PageNo<2}> 
                  <ArrowBackIosIcon />
                 Prev
                </button>

                <button style={pageBtn} 
                onClick={()=> handlePageNo("next")}
                disabled={hasNext}
                >
                Next
                <ArrowForwardIosIcon />
                </button>
                </div>
                </main>
            </div>
        </div>
    )
}

export default AllUser;