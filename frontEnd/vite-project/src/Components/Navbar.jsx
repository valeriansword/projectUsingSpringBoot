import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
function Navbar() {
  const [searchResult,setSearchResult]=useState([]);
  const [isSearchResult,setIsSearchResult]=useState(false);
  const [input,setInput]=useState("");
  const [noResult,setNoResult]=useState(false);
  const [isMobile,setIsMobile]=useState(false);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=()=>{
    axios.get("http://localhost:8080/").
    then(res=>{
      console.log(res.data);
      setSearchResult(res.data);

    }).catch(err=>{
      console.log(err);
    })

  }
  const hanldeChange=(value)=>{
    setInput(value);
    if(value.length>=1){
      setIsSearchResult(true);
    axios.get(`http://localhost:8080/products/search?keyword=${value}`).
    then(res=>{
      console.log(res.data);
      setSearchResult(res.data);
      setNoResult(res.data.length===0);
    }).catch(err=>{
      console.log(err);

    })
  
  }else{
    setIsSearchResult(false);
    setSearchResult([]);
    setNoResult(false)
  }
  }
  return (
    
    <div className='bg-black text-white flex p-4 w-full md:justify-between text-lg font-semibold max-sm:flex-col'>
      <div className='flex justify-between w-full'>
        <h1 className=''>E-Shop</h1>
        <button className='text-2xl  md:hidden w-fit' onClick={()=>setIsMobile(!isMobile)}>≡</button>
      </div>
        <ul className={`flex md:space-x-2 max-sm:flex-col ${isMobile?" block ":" max-sm:hidden "}`}>
            <Link to="/"><li>Home</li></Link>
            <Link to="/products/addProducts"><li>AddProducts</li></Link>
            <li>Categories</li>
            <span className='relative'>
                <input type='text' value={input} onChange={(e)=>hanldeChange(e.target.value)} className='rounded-md text-black pl-[10px] text-md font-normal '/>
                {
      isSearchResult &&(
        <ul className='px-[5px] py-[5px] absolute bg-white text-black mt-[5px] rounded w-full '>
          {searchResult.length>0?(
             searchResult.map((res)=>(
              <Link to={`/products/${res.id}`}><li key={res.id} className='hover:bg-gray-400 rounded-md p-[2px] '>
                <span>{res.name}</span>
              </li></Link>
            ))
          ):(
            noResult &&(
              <li>
                No such Product
              </li>
            )

          )
         }
        </ul>
      )
    }
            </span>
            
        </ul>
      
    </div>
    
    
  )
}

export default Navbar
