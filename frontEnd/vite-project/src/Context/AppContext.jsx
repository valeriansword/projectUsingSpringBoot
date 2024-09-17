import axios from 'axios';
import React,{createContext, useEffect,useState } from 'react'

const AppContext=createContext(
    // {
    //     data: [],
    //     isError: "",
    //     cart: [],
    //     addToCart: (product) => {},
    //     removeFromCart: (productId) => {},
    //     refreshData:() =>{},
    //     updateStockQuantity: (productId, newQuantity) =>{}

    // }
);

export const AppProvider=({children})=>{
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState("");
    
    useEffect(()=>{
        axios.get("http://localhost:8080/").
        then(res=>{
            console.log(res.data)
            setData(res.data);
        }).catch(err=>{
            console.log(err);
            setIsError(err.message);
        })
    },[])
    return(
        <AppContext.Provider value={{data,isError}}>
            {children}
        </AppContext.Provider>
    )

}


export default AppContext
