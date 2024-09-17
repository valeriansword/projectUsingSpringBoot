import React, { useEffect, useState } from 'react'
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
function Products() {
    const [product,setProducts]=useState({});
    const [isError,setIsError]=useState();
    const [imageUrl,setImageUrl]=useState("");
    const navigate=useNavigate();
    const {id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8080/products/${id}`).
        then((res)=>{
            console.log(res.data)
            setProducts(res.data)
            if(res.data.imageName){
                axios.get(`http://localhost:8080/products/${id}/image`,{responseType:"blob"}).
                then(res=>{
                    console.log(res);
                    setImageUrl(URL.createObjectURL(res.data));
                    console.log(imageUrl);
                    
                }).catch(err=>console.log(err));
            }
            console.log(product)
        }
        ).
            
        catch(err=>
            {console.log(err)
                setIsError(err.message);
            }
        );
        
    },[id])
    const handleDelete=()=>{
        
            axios.delete(`http://localhost:8080/products/deleteProducts/${id}`).
            then(res=>{
                alert("product Deleted",res);
                console.log("product deleted")
                 navigate("/")
                }).
            catch(err=>console.log(err))
        
        
    }

  return (
    <div className='bg-gray-700 w-full h-screen '>
        {isError &&(
            <h1 className='text-lg font-bolf text-center text-white w-full'>
                {isError}
            
            </h1>
        )}
    <div className='p-4 w-full  bg-gray-700 grid grid-cols-3 '>
        
        {!isError && product && (
           <div className='p-2  text-white  mt-[10px] flex space-x-10 w-full items-center'  >  
           <div>
            <img src={imageUrl} alt={product.imageName} className='h-fit  w-fit bg-white rounded-sm '/>
           </div>
            <div className='w-full'>
                <p className='text-sm font-thin'>{product.category}</p>              
                <h1 className='text-2xl font-bold'>{product.name}</h1>        
                <p className='text-sm font-thin mb-[10px]'>by {product.brand}</p> 
                <hr />
                <p className='text-md font-semibold mt-[20px]'>Rs.{product.price}</p>    
                {product.available?"":<button className='ring-2 ring-slate-300 bg-slate-300 text-white rounded-md'>Out Of Stock</button>}
                {product.available?<p className='mt-[20px]'>Stock available:{product.quantity}</p>:<p className='mt-[20px]'>Stock available:No</p>}
                
                <p className='mt-[20px] mb-[5px]'>Product Listed on:</p>
                {/* <p>{product.releaseDate}</p> */}
                <i> {new Date(product.releaseDate).toLocaleDateString()}</i>
                <div className='flex space-x-2'>
                <Link className='w-full' to={`/products/updateProducts/${product.id}`}><button className='text-lg font-normal ring-2 ring-white bg-white rounded-md text-violet-700 w-full mt-[10px]'>Update</button></Link>
                <button onClick={handleDelete} className='text-lg font-normal ring-2 ring-white bg-white rounded-md text-violet-700 w-full mt-[10px]'>Delete</button>
            </div>
            </div>
        </div>
        

        )}
      </div>
      </div>
      
  )
}

export default Products
