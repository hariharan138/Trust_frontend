import React from 'react'
import './Dash.css';

const InputSearch = ({setSearchValue, searchValue}) => {
  return (
    <div>
         <input 
                        type="search"
                        placeholder="Search..."
                        className="search-input" 
                        onChange={(e)=>setSearchValue(e.target.value)}
                        value={searchValue}/>
    </div>
  )
}

export default InputSearch