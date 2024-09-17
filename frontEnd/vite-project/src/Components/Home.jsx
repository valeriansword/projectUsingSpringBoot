import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import {Link} from "react-router-dom"
import AppContext from '../Context/AppContext';
function Home() {
    const [products,setProducts]=useState([]);

    const {data,isError}=useContext(AppContext);
   
    
    useEffect(()=>{
            if(data && data.length>0){
                
                const fetchImage=async()=>{               
                const updateProduct=await Promise.all(data.map((product)=>(
                    axios.get(`http://localhost:8080/products/${product.id}/image`,{responseType:"blob"}).
                    then(res=>{
                        console.log(res);
                        const imageUrl=URL.createObjectURL(res.data);
                        return {...product,imageUrl};
                    }).catch((err)=>{
                        console.log(err);
                        return{...product,imageUrl:"placeholder-image-URL"};                        
                    })
                ))
                )
                console.log(updateProduct);
                setProducts(updateProduct);
                
            }
            fetchImage();
        }
        
    },[data])
  return (
    
    <div className='p-4 w-full  bg-gray-700 grid grid-cols-3  '>
        
        {products.length!=0? (products.map((prod)=>(
            <Link to={`/products/${prod.id}`}><div className='p-2 rounded-md bg-violet-700 text-white w-[300px] mt-[10px] ' key={prod.id} onClick={()=>setId(prod.id)}>                
                <img src={prod.imageUrl} className='h-[200px] w-full rounded-md  '/>
                <h1 className='text-lg font-bold'>{prod.name}</h1>        
                <p className='text-sm font-thin'>by{prod.brand}</p> 
                <p className='text-md font-semibold mt-[25px]'>Rs.{prod.price}</p>    
                <button className='text-lg font-normal ring-2 ring-white bg-white rounded-md text-violet-700 w-full mt-[10px]'>Add To Cart</button>
            </div></Link>
        

        ))):(
            
                <h1 className='text-lg font-bolf text-center text-white'>Add Products </h1>
          
        )}
      </div>
      
  )
}

export default Home
