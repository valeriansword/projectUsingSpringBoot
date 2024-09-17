import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
function UpdateProduct() {
    const {id}=useParams();
    const [product,setProduct]=useState({});
    const [image,setImage]=useState();
    const [image1,setImage1]=useState();
    const [updateProduct,setUpdateProduct]=useState({
        name: "",
        brand: "",
        desc: "",
        price: "",
        category: "",
        quantity: "",
        releaseDate: "",
        available: false,
    })
    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/products/${id}`
            );
    
            setProduct(response.data);
          
            const responseImage = await axios.get(
                `http://localhost:8080/products/${id}/image`,
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(responseImage.data);
                    setImage1(imageUrl);
           const imageFile = await convertUrlToFile(responseImage.data,response.data.imageName)
            setImage(imageFile);     
            setUpdateProduct(response.data);
          } catch (error) {
            console.error("Error fetching product:", error);
          }
        };
    
        fetchProduct();
      }, [id]);
            
       

    const convertUrlToFile = async(blobData, fileName) => {
        const file = new File([blobData], fileName, { type: blobData.type });
        return file;
      }
      const handleChange = (e) => {
        const {name,value}=e.target;
        setUpdateProduct({...updateProduct,[name]:value});
    
      };
      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData=new FormData();
        formData.append("imageFile",image);
        formData.append("product",new Blob([JSON.stringify(updateProduct)],{type:"application/json"}))
        
          axios.put(`http://localhost:8080/products/updateProducts/${id}`,formData,{
              headers:{
                  "Content-Type":"multipart/form-data",
              },
          }).
          then(res=>
              {
                  console.log(res)
                  alert("product updated successfullt")
              }
          ).
          catch(err=>
              {
                  console.log(err)
                  alert("error adding product");
              }
          );
        
      };
    

  return (
    <div className="p-4 bg-gray-700 text-black ">
    <div className="w-full flex justify-center">
      <form className=" space-y-4 w-[40%]  " onSubmit={handleSubmit}>
        <div className="flex ">
          <h1 className="w-[50%] text-white">Name</h1>
          <input
            type="text"
            className="w-[50%]"
            placeholder={product.name}
            name="name"
            value={updateProduct.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          <h1 className="w-[50%] text-white">Brand</h1>
          <input
            type="text"
            className="w-[50%]"
            placeholder={product.brand}
            name="brand"
            value={updateProduct.brand}
            onChange={handleChange}
          />
        </div>
        <div className="flex ">
          <h1 className="w-[50%] text-white">Description</h1>
          <input
            type="text"
            className="w-[50%]"
            placeholder={product.desc}
            name="desc"
            value={updateProduct.desc}
            onChange={handleChange}
          />
        </div>
        <div className="flex ">
          <h1 className="w-[50%] text-white">Price</h1>
          <input
            type="text"
            className="w-[50%]"
            placeholder={product.price}
            name="price"
            value={updateProduct.price}
            onChange={handleChange}
          />
        </div>
        <div className="flex text-black">
          <h1 className="w-[50%] text-white">Category</h1>
          <select
            name="category"
            className="w-[50%] "
            value={updateProduct.category}
            id="category"
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option value="Gaming">Gaming</option>
            <option value="Premium">Premium</option>
            <option value="Professional">Professional</option>
            <option value="Budget">Budget</option>
            <option value="Student">Student</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="flex ">
          <h1 className="w-[50%] text-white">Stock Quantity</h1>
          <input
            type="text"
            className="w-[50%]"
            placeholder={product.quantity}
            name="quantity"
            value={updateProduct.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="flex ">
          <h1 className="w-[50%] text-white">Release Date</h1>
          <input
            type="date"
            className="w-[50%]"
            placeholder={product.releaseDate}
            name="releaseDate"
            value={updateProduct.releaseDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex ">
            
                <h1 className="w-[50%] text-white">Image</h1>
                  
                  <div className='flex-col w-full'>
        <img src={image1 ? image1:"Image available"}
            alt={product.imageName} className='w-[100%] ' />
        
          <input
            type="file"
            className="w-[70%]"
            onChange={handleImageChange}
          /></div>
        </div>
        <div className="flex  ">
          <input
            className="w-[50%] "
            type="checkbox"
            name="available"
            id="gridCheck"
            checked={updateProduct.available}
            onChange={(e) =>
              setUpdateProduct({ ...updateProduct, available: e.target.checked })
            }
          />
          <label className="w-[50%]">Product Available</label>
        </div>
        <div>
          <button type="submit" className="text-lg rounded-md px-4  ring-2 ring-violet-700 bg-violet-700 ">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
);

}

export default UpdateProduct
